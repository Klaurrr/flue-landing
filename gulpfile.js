const { src, dest, watch, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
// const gulpPug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
// const plumber = require('gulp-plumber');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
}

function scripts() {
    return src([
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// function pug() {                                              
//     return src('app/**/*.pug')
//         .pipe(plumber())
//         .pipe(gulpPug({
//             pretty: true
//           }))
//         .pipe(dest('app/index.html'))
//         .pipe(browserSync.stream());      
// }

function styles() {
    return src('app/styles.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('styles.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['app/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/js/**/*.js', '!app/js/main.min.js']).on('change', scripts);
    // watch(['app/**/*.pug']).on('change', pug);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
// exports.pug = pug;

exports.default = parallel(scripts, browsersync, watching);