module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src),
        plugins.clean()
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'Clean Error',
            message: err.message
        }
    }));
};
