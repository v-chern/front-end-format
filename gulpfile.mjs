import gulp from 'gulp';
import concat from 'gulp-concat-css';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import del from 'del';
import browserSync from 'browser-sync';

/*const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const del = require('del');*/
const bs = browserSync.create();

function html() {
    return gulp.src('src/**/*.html')
                .pipe(plumber())
                .pipe(gulp.dest('dist/'))
                .pipe(bs.reload({stream: true}));
}

function css() {
    return gulp.src('src/blocks/**/*.css')
                .pipe(plumber())
                .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/'))
                .pipe(bs.reload({stream: true}));
}

function fonts() {
    return gulp.src('src/fonts/**/*.{css,woff,woff2}')
                .pipe(gulp.dest('dist/fonts/'))
                .pipe(bs.reload({stream: true}));
}

function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', {encoding: false})
                .pipe(imagemin())
                .on('error', (err) => {
                    console.error('Error in imagemin:', err.toString());
                })
                .pipe(gulp.dest('dist/images'))
                .pipe(bs.reload({stream: true}))
                .on('end', () => {
                    console.log('Images process successfully');
                });
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

export { build };
export default watchapp;

/*
exports.build = build;

exports.default = watchapp;*/