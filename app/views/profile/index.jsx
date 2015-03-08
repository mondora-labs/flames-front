var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");
var url       = require("url");

var components       = require("components");
var ceres            = require("lib/ceres");
var colors           = require("lib/colors");
var inputWrappers    = require("lib/input-wrappers");
var ObjectInputMixin = require("lib/object-input-mixin");
var utils            = require("lib/utils");

var styles = {
    label: {
        boxSizing: "border-box",
        display: "block",
        width: "100%",
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 5
    },
    input: {
        boxSizing: "border-box",
        display: "block",
        width: "100%",
        height: 32,
        paddingLeft: 10,
        paddingRight: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.grey200,
        borderRadius: 2,
        outline: "none"
    },
    profilePage: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 80
    },
    profileInput: {
        width: 400
    }
};

var ProfileInput = React.createClass({
    mixins: [ObjectInputMixin],
    render: function () {
        return (
            <div style={styles.profileInput}>
                <div style={styles.label}>Username</div>
                <inputWrappers.input
                    style={styles.input}
                    type="text"
                    {...this.getInputPropsFor("username")}
                    placeholder="Username"
                />
                <div style={styles.label}>Name</div>
                <inputWrappers.input
                    style={styles.input}
                    type="text"
                    {...this.getInputPropsFor("name")}
                    placeholder="Name"
                />
            </div>
        );
    }
});

var Profile = React.createClass({
    propTypes: {
        userId: React.PropTypes.string,
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },
    getStateFromProps: function (props) {
        var profile = props.users.getIn([props.userId, "profile"]);
        return {
            profile: (profile && profile.toJS()) || {}
        };
    },
    getInitialState: function () {
        return this.getStateFromProps(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    },
    updateProfile: utils.throttle(function () {
        ceres.getCollection("users").update(this.props.userId, {
            profile: this.state.profile
        }).remote.fail(function (e) {
            console.log("OH SNAP!");
            console.log(e);
        });
    }, 1000),
    onChange: function () {
        this.setState({
            profile: this.refs.profile.getValue()
        }, this.updateProfile);
    },
    render: function () {
        return (
            <div style={styles.profilePage}>
                <ProfileInput ref="profile" value={this.state.profile} onChange={this.onChange} />
            </div>
        );
    }
});

module.exports = Profile;
