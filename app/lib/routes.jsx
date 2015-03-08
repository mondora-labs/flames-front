var React = require("react");
var Router = require("react-router");

var views = require("views");

module.exports = (
    <Router.Route name="root" path="/" handler={views.Root}>
        <Router.Route name="m" path="m/:name" handler={views.M} />
        <Router.Route name="kindle" path="m/:name/kindle" handler={views.Kindle} />
        <Router.Route name="profile" path="profile" handler={views.Profile} />
        <Router.DefaultRoute handler={views.NotFound} />
    </Router.Route>
);
