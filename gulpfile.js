const { src, dest, series, parallel, watch } = require('gulp'),
    gulpSass = require('gulp-sass'),
    asciidoctor = require('gulp-asciidoctor'),
    gulpConnect = require('gulp-connect');

const paths = {
    sass: 'src/sass/**/*.scss',
    dist: 'build/dist/',
    web: 'build/web/'
};

/*
 * Building the theme
 */

// Compile SASS files to build/dist/css/
function sass() {
    return src(paths.sass)
        .pipe(gulpSass({outputStyle: 'compressed'}))
        .pipe(dest(paths.dist + "css"));
}


/*
 * Developer tools
 */

// Copy built theme to static web folder
function copyDist() {
    return src(paths.dist + '**')
        .pipe(dest(paths.web));
}

// Render test Asciidoctor document
function render() {
    return src('test/**.adoc')
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
                'highlightjsdir=highlight',
                'stylesdir=css',
                'stylesheet=spring.css',
                'docinfo=shared',
                'linkcss',
                'docinfodir='.concat(process.cwd(), '/src/')
            ]
        }))
        .pipe(dest(paths.web))
        .pipe(gulpConnect.reload());
}

function serveHighlight() {
    return src('src/highlight/**')
        .pipe(dest(paths.web + '/highlight'));
}

// Watch files modified in src/** and rebuild theme + sample document
function watchFiles(cb) {
    watch('src/**', update);
    cb();
}

// Serve sample document and reload for changes
function connect(cb) {
    gulpConnect.server({
        root: paths.web,
        livereload: true
    });
    cb();
}

const build = series(sass, serveHighlight);
const update = series(build, copyDist, render, serveHighlight);
exports.default = build;
exports.dev = series(update, parallel(connect, watchFiles));