const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
    return gulp.src('src/**/*.html')
                .pipe(plumber())
                .pipe(gulp.dest('dist/'))
                .pipe(browserSync.reload({stream: true}));
}

function css() {
    return gulp.src('src/blocks/**/*.css')
                .pipe(plumber())
                .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/'))
                .pipe(browserSync.reload({stream: true}));
}

function fonts() {
    return gulp.src('src/fonts/**/*.{css,woff,woff2}')
                .pipe(gulp.dest('dist/fonts/'))
                .pipe(browserSync.reload({stream: true}));
}

function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
                .pipe(gulp.dest('dist/images'))
                .pipe(browserSync.reload({stream: true}));
  }

function clean() {
    return del('dist');
}

function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/blocks/**/*.css'], css);
    gulp.watch(['src/fonts/**/*.{css,woff,woff2}'], fonts);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}

const build = gulp.series(clean, gulp.parallel(html, css, fonts, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.build = build;

exports.default = watchapp;