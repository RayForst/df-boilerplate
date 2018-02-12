module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src),
        plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [plugins.pngquant()]
        }),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'Clean Error',
            message: err.message
        }
    }));
};
