module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src, {}),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'Fonts Error',
            message: err.message
        }
    }));
};
