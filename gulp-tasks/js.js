const  webpackStream = require('webpack-stream')
    , webpack = require('webpack')

module.exports = function (gulp, plugins, options) {
    let webpackPlugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common-chunk',
            minChunks: 2
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery'
        })
    ];

    if (options.isProd) {
        webpackPlugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    warnings: false
                }
            })
        )
    }

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
            watch: options.watch,
            devtool: !options.isProd ? 'cheap-module-inline-source-map' : '',
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
            plugins: webpackPlugins,
            watchOptions: {
                aggregateTimeout: 200,
                poll: true
            }
        }, webpack),
        gulp.dest(options.dest)
    ).on('error', plugins.notify.onError(function (err) {
        return {
            title: 'CSS',
            message: err.message
        }
    }));
};
