const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();

plugins.multipipe = require('multipipe');
plugins.pngquant = require('imagemin-pngquant');

const CONFIG = {
    src: path.join(__dirname, 'src'),
    dest: path.join(__dirname, 'static'),
    isProd: (typeof argv.env !== 'undefined' && argv.env === 'prod')
};


gulp.task('css', () => require('./gulp-tasks/css')(gulp, plugins, {
    src: [CONFIG.src + "/css/**/*.scss"],
    dest: CONFIG.dest + "/css",
    isProd: CONFIG.isProd
}));


gulp.task('js', () => require('./gulp-tasks/js')(gulp, plugins, {
    src: [CONFIG.src + "/js/**/*.js"],
    dest: CONFIG.dest + "/js",
    isProd: CONFIG.isProd,
    watch: argv.watch
}));


gulp.task('html', () => require('./gulp-tasks/html')(gulp, plugins, {
    src: [
        CONFIG.src + "/html/pages/**/*.html",
        "!"+CONFIG.src + "/html/pages/**/_*.html" // exclude partials
    ],
    dest: CONFIG.dest + "/",
    images: CONFIG.dest,
    templateFolder: CONFIG.src + "/html",
    isProd: CONFIG.isProd
}));


gulp.task('images', () => require('./gulp-tasks/images')(gulp, plugins, {
    src: CONFIG.src + "/assets/img/**/*.{jpg,jpeg,png,svg,gif}",
    dest: CONFIG.dest + "/img"
}));


gulp.task('video', () => require('./gulp-tasks/video')(gulp, plugins, {
    src: CONFIG.src + "/assets/video/**/*.{mov,mp4,ogv,webm}",
    dest: CONFIG.dest + "/video"
}));


gulp.task('fonts', () => require('./gulp-tasks/fonts')(gulp, plugins, {
    src: CONFIG.src + "/assets/fonts/**/*.{ttf,otf,woff,woff2}",
    dest: CONFIG.dest + "/fonts"
}));


gulp.task('clean', () => require('./gulp-tasks/clean')(gulp, plugins, {
    src: CONFIG.dest + "/*"
}));


gulp.task('watch', function() {
    if (argv.watch) {
        gulp.watch(CONFIG.src + "/css/**/*.scss", gulp.series('css'));
        gulp.watch(CONFIG.src + "/html/**/*.html", gulp.series('html'));
    }
});


gulp.task('serve', function() {
    browserSync.init({
        server: 'static'
    });

    browserSync.watch(CONFIG.src+"/**/*.*").on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('clean', 'images', 'fonts', 'video', 'css', 'html', gulp.parallel('js', 'watch', 'serve')));

gulp.task('default', gulp.series('clean', 'images', 'fonts', 'video', 'css', 'html', 'js'));


