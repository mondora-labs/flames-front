var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");
var url       = require("url");
var vagueTime = require("vague-time");

var components = require("components");
var ceres      = require("lib/ceres");
var colors     = require("lib/colors");

var styles = {
    card: {
        boxSizing: "border-box",
        display: "flex",
        padding: 10
    },
    position: {
        display: "flex",
        alignItems: "center",
        color: colors.grey500,
        width: 25
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: 8
    },
    title: {
        fontSize: 15
    },
    domain: {
        fontSize: 11,
        color: colors.grey500,
        marginLeft: 5
    },
    secondLineToken: {
        fontSize: 10,
        color: colors.grey500,
        marginRight: 5
    }
};

var SparkCard = React.createClass({
    propTypes: {
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        spark: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        position: React.PropTypes.number.isRequired
    },
    componentWillMount: function () {
        this.subscription = ceres.subscribe(
            "sparks:flamesCount",
            this.props.spark.get("_id")
        );
    },
    componentWillUnmount: function () {
        this.subscription.stop();
    },
    getDomain: function () {
        return url.parse(this.props.spark.get("url")).hostname;
    },
    getAge: function () {
        return vagueTime.get({
            to: this.props.spark.get("date")
        });
    },
    getUser: function () {
        var userId = this.props.spark.get("userId");
        var username = this.props.users.getIn([userId, "profile", "username"]);
        return ("by " + username);
    },
    render: function () {
        return (
            <div style={styles.card}>
                <div style={styles.position}>
                    {this.props.position + "."}
                </div>
                <components.Voter collection="sparks" _id={this.props.spark.get("_id")} />
                <div style={styles.info}>
                    <div>
                        <span style={styles.title}>
                            {this.props.spark.get("title")}
                        </span>
                        <span style={styles.domain}>
                            {"(" + this.getDomain() + ")"}
                        </span>
                    </div>
                    <div>
                        <span style={styles.secondLineToken}>
                            {this.props.spark.get("points") + " points"}
                        </span>
                        <span style={styles.secondLineToken}>
                            {this.getUser()}
                        </span>
                        <span style={styles.secondLineToken}>
                            {this.getAge()}
                        </span>
                        <span style={styles.secondLineToken}>
                            {"|"}
                        </span>
                        <span style={styles.secondLineToken}>
                            {this.props.spark.get("flamesCount") + " flames"}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SparkCard;
