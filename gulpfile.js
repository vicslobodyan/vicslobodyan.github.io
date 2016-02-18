/*global -$ */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('gulp-main-bower-files');

gulp.task('styles', function () {
    gulp.src('assets/styles/src/main.less')
        .pipe($.less({
            paths: ['.']
        }))
        .pipe(plumber())
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 3 version']}),
            require('css-mqpacker').postcss
        ]))
        .pipe($.concatCss('main.css'))
        .pipe($.csso())
        .pipe($.size())
        .pipe(gulp.dest('assets/styles/dist'));
});

gulp.task('bower-files', function(){
    var filter = gulpFilter('**/*.js');
    return gulp.src('bower.json')
        .pipe(mainBowerFiles())
        .pipe(filter)
        .pipe($.concat('vendor.js'))
        .pipe($.size())
        .pipe(gulp.dest("assets/scripts/dist/lib"));
});

gulp.task('scripts', function () {
    gulp.src('assets/scripts/src/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.concat('main.js'))
        .pipe($.sourcemaps.write())
        .pipe($.uglify())
        .pipe($.size())
        .pipe(gulp.dest('assets/scripts/dist'));
});

gulp.task('clean', ['clean:scripts', 'clean:styles']);

gulp.task('clean:scripts', function () {
    var filter = gulpFilter(['!assets/scripts/dist/lib']);
    return gulp.src([
            'assets/scripts/dist/*'
        ])
        .pipe(filter)
        .pipe($.rimraf());
});
gulp.task('clean:styles', function () {
    return gulp.src([
            'assets/styles/dist/*',
        ])
        .pipe($.rimraf());
});

gulp.task('serve', ['clean', 'bower-files', 'scripts', 'styles'], function () {
    gulp.watch('assets/scripts/src/**/*.js', ['scripts']);
    gulp.watch('assets/styles/src/**/*.less', ['clean:styles', 'styles']);

    livereload.listen();
});

gulp.task('build', ['clean'], function () {
    gulp.start('styles', 'bower-files', 'scripts');
});

gulp.task('default', [], function () {
    gulp.start('build');
});
