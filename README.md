# Gulp

gulp --env=prod - Production build
gulp --env=dev - Dev build
gulp --watch - Dev watch

# Features

CSS - SASS, AUTOPREFIXER, *CSSNANO
HTML - nunjucks template engine, prepared demo structure, *html-minifier

# Structure

static/* - Сюда собираются все ассеты, папка в гит игноре


# Todo
Настрооить html-minifier
Подключение текстов из .json файла
Source-map
Linting
Manifest Asset version
RetinaJs

# Known issues

Browsersync может работать только с теми файлами, что были добавленные перед стартом gulp, поскольку новые файлы не попадают
в gulp watch и не отсылают свои изменения в директорию browsersync