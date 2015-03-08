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

var styles = {
    common: {
        boxSizing: "border-box",
        display: "block",
        width: "100%",
        marginBottom: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.grey200,
        borderRadius: 2,
        outline: "none"
    },
    kindlePage: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 80
    },
    form: {
        display: "block",
        width: "35%"
    },
    input: {
        height: 32,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        height: 250,
        padding: 10
    },
    submit: {
        height: 32,
        background: colors.blue700,
        fontSize: 14,
        border: 0,
        width: null,
        color: colors.white,
        paddingLeft: 10,
        paddingRight: 10,
        float: "right"
    },
    preview: {
        display: "block",
        width: "40%",
        marginRight: "10%"
    },
    previewTitle: {
        fontSize: 24,
        marginBottom: 10,
        height: 32,
        lineHeight: "32px"
    },
    previewDomain: {
        fontSize: 16,
        marginBottom: 10,
        height: 32,
        lineHeight: "32px"
    },
    greyed: {
        color: colors.grey500
    },
    leftSpacer: {
        width: "5%"
    },
    middleSpacer: {
        width: 1,
        background: colors.grey500,
        marginLeft: "5%",
        marginRight: "5%"
    }
};

var SparkInput = React.createClass({
    mixins: [ObjectInputMixin],
    render: function () {
        return (
            <div>
                <inputWrappers.input
                    style={R.merge(styles.common, styles.input)}
                    type="text"
                    {...this.getInputPropsFor("title")}
                    placeholder="Title"
                />
                <inputWrappers.input
                    style={R.merge(styles.common, styles.input)}
                    type="text"
                    {...this.getInputPropsFor("url")}
                    placeholder="Url"
                />
                <inputWrappers.textarea
                    style={R.merge(styles.common, styles.text)}
                    {...this.getInputPropsFor("text")}
                    placeholder="Text"
                />
            </div>
        );
    }
});

var SparkPreview = React.createClass({
    propTypes: {
        spark: React.PropTypes.object.isRequired
    },
    renderTitle: function () {
        var title = this.props.spark.title;
        var titleStyle = R.merge(
            styles.previewTitle,
            (title ? {} : styles.greyed)
        );
        return (
            <div style={titleStyle}>
                {title ? title : "Title"}
            </div>
        );
    },
    renderDomain: function () {
        var sparkUrl = this.props.spark.url;
        return (
            <div style={R.merge(styles.previewDomain, styles.greyed)}>
                {sparkUrl ? "(" + url.parse(sparkUrl).hostname + ")" : ""}
            </div>
        );
    },
    renderBody: function () {
        var text = this.props.spark.text;
        return (
            text ?
            <components.Markdown string={text} /> :
            <div style={styles.greyed}>{"Text"}</div>
        );
    },
    render: function () {
        return (
            <div>
                {this.renderTitle()}
                {this.renderDomain()}
                {this.renderBody()}
            </div>
        );
    }
});

var Kindle = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin,
        Router.Navigation,
        Router.State
    ],
    propTypes: {
        sparks: React.PropTypes.instanceOf(Immutable.Map)
    },
    getInitialState: function () {
        return {
            spark: {
                text: "",
                title: "",
                url: ""
            }
        };
    },
    onSubmit: function (e) {
        e.preventDefault();
        var self = this;
        self.setState({
            submitting: true
        });
        var channel = this.getParams().name;
        var spark = R.merge(this.state.spark, {
            channel: channel
        });
        ceres.getCollection("sparks").insert(spark).remote
            .then(function () {
                self.transitionTo("m", self.getParams());
            })
            .fail(function (e) {
                self.setState({
                    submitting: false
                });
                console.log("OH SNAP!");
                console.log(e);
            });
    },
    renderSubmitButton: function () {
        return (
            <button
                style={R.merge(styles.common, styles.submit)}
                type="submit"
                disabled={this.state.submitting}
            >
                {this.state.submitting ? "Submitting..." : "Submit"}
            </button>
        );
    },
    render: function () {
        return (
            <div style={styles.kindlePage}>
                <div style={styles.leftSpacer}></div>
                <form style={styles.form} onSubmit={this.onSubmit}>
                    <SparkInput valueLink={this.linkState("spark")} />
                    {this.renderSubmitButton()}
                </form>
                <div style={styles.middleSpacer}></div>
                <div style={styles.preview}>
                    <SparkPreview spark={this.state.spark} />
                </div>
            </div>
        );
    }
});

module.exports = Kindle;
