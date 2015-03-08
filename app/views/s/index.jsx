var Immutable = require("immutable");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var ceres      = require("lib/ceres");
var colors     = require("lib/colors");

var styles = {
};

var S = React.createClass({
    mixins: [Router.State],
    propTypes: {
        flames: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        sparks: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },
    statics: {
        willTransitionTo: function (transition, params) {
            ceres.subscribe("sparks:byId", params.id);
        }
    },
    getSpark: function () {
        return this.props.sparks.get(this.getParams().id);
    },
    renderSparkCard: function () {
        return (
            this.getSpark() ?
            <components.SparkCard
                users={this.props.users}
                spark={this.getSpark()}
                position={1}
            /> :
            null
        );
    },
    render: function () {
        return (
            <div>
                {this.renderSparkCard()}
            </div>
        );
    }
});

module.exports = S;
