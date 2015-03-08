var Immutable = require("immutable");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
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
    createFlame: {
        textDecoration: "none",
        fontSize: 20,
        color: colors.grey500
    }
};

var M = React.createClass({
    mixins: [Router.State],
    propTypes: {
        flames: React.PropTypes.instanceOf(Immutable.Map)
    },
    renderEmptyChannel: function () {
        return this.props.flames.size === 0 ? (
            <div style={styles.emptyChannel}>
                <div style={styles.emptyChannelText}>
                    {"no flames to show for this channel"}
                    <br />
                    <br />
                    <Router.Link
                        to="kindle"
                        params={this.getParams()}
                        style={styles.createFlame}
                    >
                        {"create one now"}
                    </Router.Link>
                </div>
            </div>
        ) : null;
    },
    renderFlameCards: function () {
        return this.props.flames.map(function (flame) {
            return <components.FlameCard flame={flame} />;
        }).toJS();
    },
    render: function () {
        return (
            <div style={styles.emptyChannel}>
                {this.renderEmptyChannel()}
                {this.renderFlameCards()}
            </div>
        );
    }
});

module.exports = M;
