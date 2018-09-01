module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src, {}),
        plugins.htmlclean({
            edit: function(html) { return html.replace(/\u2028/ig, ''); }
        }),
        plugins.twig({
            base: options.templateFolder
        }),
        plugins.injectSvg({ base:  '/static' }),
                plugins.rename({dirname: ''}),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'Html Error',
            message: err.message
        }
    }));
};
