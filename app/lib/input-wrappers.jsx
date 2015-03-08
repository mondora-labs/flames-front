var React = require("react");

var wrap = function (name) {
    return React.createClass({
        displayName: name,
        getValue: function () {
            return this.refs.wrapped.getDOMNode().value;
        },
        render: function () {
            return React.createElement(name, React.__spread({},  this.props, {ref: "wrapped"}));
        }
    });
};

exports.input = wrap("input");
exports.textarea = wrap("textarea");
