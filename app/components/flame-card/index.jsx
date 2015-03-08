var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");
var url       = require("url");
var vagueTime = require("vague-time");

var colors = require("lib/colors");

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
    voteButtons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        color: colors.grey500,
        width: 15
    },
    clickable: {
        cursor: "pointer"
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

var FlameCard = React.createClass({
    propTypes: {
        flame: React.PropTypes.instanceOf(Immutable.Map)
    },
    getDomain: function () {
        return url.parse(this.props.flame.get("url")).hostname;
    },
    getAge: function () {
        return vagueTime.get({
            to: this.props.flame.get("date")
        });
    },
    vote: function (direction) {
        console.log("%svoting", direction);
    },
    render: function () {
        return (
            <div style={styles.card}>
                <div style={styles.position}>
                    {this.props.flame.get("position") + "."}
                </div>
                <div style={styles.voteButtons}>
                    <div style={styles.clickable} onClick={R.partial(this.vote, "up")}>
                        {"+"}
                    </div>
                    <div style={styles.clickable} onClick={R.partial(this.vote, "down")}>
                        {"-"}
                    </div>
                </div>
                <div style={styles.info}>
                    <div>
                        <span style={styles.title}>
                            {this.props.flame.get("title")}
                        </span>
                        <span style={styles.domain}>
                            {"(" + this.getDomain() + ")"}
                        </span>
                    </div>
                    <div>
                        <span style={styles.secondLineToken}>
                            {this.props.flame.get("points") + " points"}
                        </span>
                        <span style={styles.secondLineToken}>
                            {"by " + this.props.flame.get("kindler")}
                        </span>
                        <span style={styles.secondLineToken}>
                            {this.getAge()}
                        </span>
                        <span style={styles.secondLineToken}>
                            {"|"}
                        </span>
                        <span style={styles.secondLineToken}>
                            {this.props.flame.get("numberOfComments") + " comments"}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FlameCard;
