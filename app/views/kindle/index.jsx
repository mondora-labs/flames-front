var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var colors     = require("lib/colors");
var markdown   = require("lib/markdown");

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
        width: "40%"
    },
    preview: {
        display: "block",
        width: "40%"
    },
    input: {
        height: 32,
        paddingLeft: 10,
        paddingRight: 10
    },
    body: {
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
        paddingRight: 10
    }
};

var Kindle = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    propTypes: {
        flames: React.PropTypes.instanceOf(Immutable.Map)
    },
    getInitialState: function () {
        return {};
    },
    onSubmit: function (e) {
        e.preventDefault();
        console.log("Submit");
    },
    renderPreview: function () {
        var innerHtml = {
            __html: markdown.render(this.state.body)
        };
        return <div dangerouslySetInnerHTML={innerHtml}></div>;
    },
    render: function () {
        return (
            <div style={styles.kindlePage}>
                <form style={styles.form} onSubmit={this.onSubmit}>
                    <input
                        style={R.merge(styles.common, styles.input)}
                        type="text"
                        valueLink={this.linkState("title")}
                        placeholder="Title"
                    />
                    <input
                        style={R.merge(styles.common, styles.input)}
                        type="text"
                        valueLink={this.linkState("url")}
                        placeholder="Url"
                    />
                    <textarea
                        style={R.merge(styles.common, styles.body)}
                        valueLink={this.linkState("body")}
                        placeholder="Description"
                    />
                    <button style={R.merge(styles.common, styles.submit)} type="submit">
                        Submit
                    </button>
                </form>
                <div style={styles.preview}>
                    <h3>{this.state.title}</h3>
                    {this.renderPreview()}
                </div>
            </div>
        );
    }
});

module.exports = Kindle;
