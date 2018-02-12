const  webpackStream = require('webpack-stream')
    , webpack = webpackStream.webpack
    , newWebpack = require('webpack')

module.exports = function (gulp, plugins, options) {
    return plugins.multipipe(
        gulp.src(options.src, {}),
        plugins.webpack({
            entry: {
                // Index
                'index': __dirname + "/../src/js/index/index",
                'profile': __dirname + "/../src/js/profile/profile"
            },
            output: {
                publicPath: options.dest,
                filename: '[name].js'
            },
            watch: true,
            devtool: '',
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: [
                        /js\/vendor/,
                        /(node_modules|bower_components)/
                    ],
                    loader: 'babel-loader?presets[]=es2015'
                }]
            },
            plugins: [
                new newWebpack.NoErrorsPlugin(),
                new newWebpack.optimize.CommonsChunkPlugin({
                    name: 'common-chunk',
                    minChunks: 2
                }),
                new newWebpack.ProvidePlugin({
                    $: 'jquery',
                    jquery: 'jquery',
                    jQuery: 'jquery',
                    "window.jQuery": 'jquery'
                })
            ],
            watchOptions: {
                aggregateTimeout: 200,
                poll: true
            }
        }, newWebpack),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'CSS',
            message: err.message
        }
    }));
};
