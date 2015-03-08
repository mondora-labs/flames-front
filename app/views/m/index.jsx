var Immutable = require("immutable");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var ceres      = require("lib/ceres");
var colors     = require("lib/colors");

var styles = {
    emptyChannel: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 100,
        color: colors.grey500
    },
    emptyChannelText: {
        textAlign: "center"
    },
    createSpark: {
        textDecoration: "none",
        fontSize: 20,
        color: colors.grey500
    }
};

var M = React.createClass({
    mixins: [Router.State],
    propTypes: {
        sparks: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },
    statics: {
        willTransitionTo: function (transition, params) {
            ceres.subscribe("sparks:byChannel", params.name);
        }
    },
    renderEmptyChannel: function () {
        return this.props.sparks.size === 0 ? (
            <div style={styles.emptyChannel}>
                <div style={styles.emptyChannelText}>
                    {"no sparks to show for this channel"}
                    <br />
                    <br />
                    <Router.Link
                        to="kindle"
                        params={this.getParams()}
                        style={styles.createSpark}
                    >
                        {"create one now"}
                    </Router.Link>
                </div>
            </div>
        ) : null;
    },
    renderSparkCards: function () {
        var self = this;
        var index = 1;
        return self.props.sparks.map(function (spark, _id) {
            return (
                <components.SparkCard
                    key={_id}
                    users={self.props.users}
                    spark={spark}
                    position={index++}
                />
            );
        }).toJS();
    },
    render: function () {
        return (
            <div>
                {this.renderEmptyChannel()}
                {this.renderSparkCards()}
            </div>
        );
    }
});

module.exports = M;
