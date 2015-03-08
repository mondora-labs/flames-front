var browserify  = require("browserify");
var browserSync = require("browser-sync");
var fs          = require("fs");
var gulp        = require("gulp");
var concat      = require("gulp-concat");
var rename      = require("gulp-rename");
var gutil       = require("gulp-util");
var source      = require("vinyl-source-stream");
var watchify    = require("watchify");

var bundler= watchify(browserify("./app/main.jsx", {
    paths: ["./app"],
    extensions: [".jsx"],
    cache: {},
    packageCache: {},
    fullPaths: true
}));
var bundle = function () {
    return bundler.bundle()
        .on("error", gutil.log.bind(gutil, "Browserify Error"))
        .pipe(source("bundle.js"))
        .pipe(rename("index.js"))
        .pipe(gulp.dest("./builds/"))
        .pipe(reload({stream: true}));
};
bundler.transform("reactify");
bundler.on("update", bundle);
bundler.on("log", gutil.log);
gulp.task("appJs", bundle);

gulp.task("appHtml", function () {
    gulp.src("./app/main.html")
        .pipe(rename("index.html"))
        .pipe(gulp.dest("./builds/"));
});

gulp.task("vendorCss", function () {
    var deps = JSON.parse(fs.readFileSync("./deps.json"));
    return gulp.src(deps.css)
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest("./builds/"));
});

gulp.task("vendorJs", function () {
    var deps = JSON.parse(fs.readFileSync("./deps.json"));
    gulp.src(deps.js)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./builds/"));
});

var reload = browserSync.reload;
gulp.task("serve", function() {
    browserSync({
        server: {
            baseDir: "builds"
        },
        port: 8080,
        ghostMode: false,
        injectChanges: false,
        notify: false
    });
});

gulp.task("default", [
    "appJs",
    "appHtml",
    "vendorCss",
    "vendorJs",
    "serve"
]);
