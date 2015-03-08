var React = require("react");

var ceres  = require("lib/ceres");
var colors = require("lib/colors");

var styles = {
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
    }
};

var Voter = React.createClass({
    propTypes: {
        collection: React.PropTypes.string.isRequired,
        _id: React.PropTypes.string.isRequired
    },
    upvote: function () {
        ceres.call(this.props.collection + ":upvote", this.props._id);
    },
    downvote: function () {
        ceres.call(this.props.collection + ":downvote", this.props._id);
    },
    render: function () {
        return (
            <div style={styles.voteButtons}>
                <div style={styles.clickable} onClick={this.upvote}>
                    {"+"}
                </div>
                <div style={styles.clickable} onClick={this.downvote}>
                    {"-"}
                </div>
            </div>
        );
    }
});

module.exports = Voter;
