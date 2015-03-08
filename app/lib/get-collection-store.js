var Immutable = require("immutable");
var Reflux    = require("reflux");

var ceres = require("lib/ceres");

module.exports = function getCollectionStore (name) {
    var Col = ceres.getCollection(name);
    return Reflux.createStore({
        init: function () {
            Col._set.on("put", this.onChange);
            Col._set.on("del",this.onChange);
            this[name] = Immutable.Map();
        },
        onChange: function (users) {
            this[name] = Immutable.fromJS(Col._set._items);
            this.trigger(this[name]);
        }
    });
};
