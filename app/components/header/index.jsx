var Immutable = require("immutable");
var React     = require("react");
var Router    = require("react-router");

var colors = require("lib/colors");
var ceres  = require("lib/ceres");

var styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: colors.grey200,
        color: colors.blue700,
        paddingRight: 10,
        paddingLeft: 10,
        height: 32,
        borderColor: colors.blue700,
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 4
    },
    loginButton: {
        cursor: "pointer"
    },
    username: {
        fontSize: 12
    },
    spacer: {
        display: "inline-block",
        width: 10
    }
};

var Header = React.createClass({
    mixins: [Router.State],
    propTypes: {
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        userId: React.PropTypes.string
    },
    login: function () {
        ceres.loginWithGoogle();
    },
    renderLogin: function () {
        var user = this.props.users.get(this.props.userId);
        return (
            user ?
            <span style={styles.username}>{user.getIn(["profile", "name"])}</span> :
            <span style={styles.loginButton} onClick={this.login}>login</span>
        );
    },
    render: function () {
        return (
            <div style={styles.header}>
                <span>
                    {":m"}
                    <span style={styles.spacer}></span>
                    {"/" + this.getParams().name}
                </span>
                {this.renderLogin()}
            </div>
        );
    }
});

module.exports = Header;
