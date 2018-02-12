module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src, {}),
        plugins.nunjucks({
            searchPaths: [options.templateFolder]
        }),
        plugins.injectSvg({ base:  '/static' }),
        plugins.if(options.isProd, plugins.htmlmin({collapseWhitespace: true})),
        plugins.rename({dirname: ''}),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'Html Error',
            message: err.message
        }
    }));
};
