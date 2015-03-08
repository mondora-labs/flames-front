var React  = require("react");
var Router = require("react-router");
var Reflux = require("reflux");

var components = require("components");
var ceres      = require("lib/ceres");
var colors     = require("lib/colors");
var stores     = require("lib/stores");

var rootStyle = {
    color: colors.grey900
};

var Root = React.createClass({
    mixins: [
        Reflux.connect(stores.flames, "flames"),
        Reflux.connect(stores.sparks, "sparks"),
        Reflux.connect(stores.users, "users")
    ],
    getInitialState: function () {
        return {
            flames: stores.flames.flames,
            sparks: stores.sparks.sparks,
            users: stores.users.users
        };
    },
    setUserId: function () {
        this.setState({
            userId: ceres.userId
        });
    },
    componentDidMount: function () {
        ceres.on("login", this.setUserId);
        ceres.on("logout", this.setUserId);
    },
    componentWillUnmount: function () {
        ceres.off("login", this.setUserId);
        ceres.off("logout", this.setUserId);
    },
    render: function () {
        return (
            <div style={rootStyle}>
                <components.Header {...this.state} />
                <Router.RouteHandler {...this.state} />
            </div>
        );
    }
});

module.exports = Root;
