var Remarkable = require("remarkable");
var hljs       = require("highlight.js");

var markdown = new Remarkable({
    xhtmlOut: false,
    linkify: true,
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

module.exports = markdown;
