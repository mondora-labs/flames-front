exports.throttle = function throttle (fn, limit) {
    var inQueue = false;
    var latestArgs;
    return function () {
        var self = this;
        latestArgs = arguments;
        if (!inQueue) {
            setTimeout(function () {
                fn.apply(self, latestArgs);
                inQueue = false;
            }, limit);
            inQueue = true;
        }
    };
};
