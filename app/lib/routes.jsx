var React = require("react");
var Router = require("react-router");

var views = require("views");

module.exports = (
    <Router.Route name="root" path="/" handler={views.Root}>
        <Router.Route name="kindle" path="m/:name/kindle" handler={views.Kindle} />
        <Router.Route name="m" path="m/:name/" handler={views.M} />
        <Router.Route name="profile" path="profile" handler={views.Profile} />
        <Router.Route name="s" path="s/:id" handler={views.S} />
        <Router.DefaultRoute handler={views.NotFound} />
    </Router.Route>
);
