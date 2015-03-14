var hljs       = require("highlight.js");
var React      = require("react");
var Remarkable = require("remarkable");

var markdown = new Remarkable({
    xhtmlOut: false,
    linkify: true,
    langPrefix: "hljs language-",
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (ignore) {}
        }
        try {
            return hljs.highlightAuto(str).value;
        } catch (ignore) {}
        return "";
    }
});

var Markdown = React.createClass({
    propTypes: {
        string: React.PropTypes.string
    },
    render: function () {
        var innerHtml = {
            __html: markdown.render(this.props.string || "")
        };
        return (
            <div className="ac-markdown">
                <style>
                    {".ac-markdown code {border-radius: 2px;}"}
                </style>
                <div dangerouslySetInnerHTML={innerHtml}></div>
            </div>
        );
    }
});

module.exports = Markdown;
