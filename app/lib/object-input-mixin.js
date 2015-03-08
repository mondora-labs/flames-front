var React = require("react");

var refPrefix = "inputRef:";
var getRefFromProp = function (prop) {
    return refPrefix + prop;
};
var getPropFromRef = function (ref) {
    return ref.slice(refPrefix.length);
};

var ObjectInputMixin = {
    propTypes: {
        value: React.PropTypes.object,
        onChange: React.PropTypes.func,
        valueLink: React.PropTypes.shape({
            value: React.PropTypes.object.isRequired,
            requestChange: React.PropTypes.func.isRequired
        })
    },
    _getValueFor: function (prop) {
        var value = this.props.value || this.props.valueLink.value;
        return value[prop];
    },
    _onChange: function () {
        if (this.props.onChange) {
            this.props.onChange();
        }
        if (this.props.valueLink) {
            this.props.valueLink.requestChange(this.getValue());
        }
    },
    getValue: function () {
        var self = this;
        return Object.keys(self.refs)
            .filter(function (ref) {
                return ref.slice(0, refPrefix.length) === refPrefix;
            })
            .reduce(function (acc, ref) {
                acc[getPropFromRef(ref)] = self.refs[ref].getValue();
                return acc;
            }, {});
    },
    getInputPropsFor: function (prop) {
        return {
            ref: getRefFromProp(prop),
            value: this._getValueFor(prop),
            onChange: this._onChange
        };
    }
};

module.exports = ObjectInputMixin;
