module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src, {}),
        plugins.rename({dirname: ''}),
        plugins.sass({
            includePaths: [
                'node_modules/reset-css/',
                'node_modules/normalize-scss/sass/',
            ]
        }),
        plugins.if(options.isProd, plugins.autoprefixer(['last 15 versions', 'not ie <= 10'], {cascade: false})),
        plugins.if(options.isProd, plugins.cssnano({zindex: false})),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'CSS',
            message: err.message
        }
    }));
};
