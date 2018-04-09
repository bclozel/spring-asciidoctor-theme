'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    asciidoctor = require('gulp-asciidoctor'),
    connect = require('gulp-connect');

var paths = {
    sass: 'src/sass/**/*.scss',
    dist: 'build/dist/',
    web: 'build/web/'
};

// Compile SASS files to build/dist/css/
gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.dist + "css"));
});

// Build the full theme in build/dist/
gulp.task('build', ['sass'], function () {
});

gulp.task('copy-dist', ['build'], function () {
    return gulp.src(paths.dist + '**')
        .pipe(gulp.dest(paths.web));
});

// Build a sample Asciidoctor document in build/web/index.html
gulp.task('render', ['copy-dist', 'build'], function () {
    return gulp.src('test/index.adoc')
        .pipe(asciidoctor({
            safe: 'unsafe',
            doctype: 'book',
            attributes: [
                'icons=font',
                'idprefix',
                'idseparator=-',
                'docinfo',
                'sectanchors',
                'sectnums',
                'source-highlighter=highlight.js',
                'stylesdir=css',
                'stylesheet=spring.css',
                'docinfo=shared',
                'linkcss',
                'docinfodir='.concat(process.cwd(), '/src/')
            ]
        }))
        .pipe(gulp.dest(paths.web))
        .pipe(connect.reload());
});

// Watch files modified in src/** and rebuild theme + sample document
gulp.task('watch', ['render'], function () {
    gulp.watch('src/**', ['render']);
});

// Start a local web server and reload the page automatically on changes
gulp.task('connect', function() {
    connect.server({
        root: paths.web,
        livereload: true
    });
});

gulp.task('dev', ['connect', 'watch']);