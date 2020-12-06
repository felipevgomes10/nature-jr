const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');

const server = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
};
exports.server = server;

const minify = () => {
  return gulp
    .src('./css/files/*.css')
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(cssMinify({ compatibility: 'ie8' }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};
exports.minify = minify;

const optimizeJS = () => {
  return gulp
    .src('./scripts/files/*.js')
    .pipe(
      webpack({
        entry: {
          script: './scripts/script.js',
        },
        output: {
          filename: 'main.js',
        },
      }),
    )
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};
exports.optimizeJS = optimizeJS;

const watch = () => {
  gulp.watch('./scripts/files/*.js', optimizeJS);
  gulp.watch('./css/files/*.css', minify);
  gulp.watch('./*.html').on('change', browserSync.reload);
};
exports.watch = watch;

exports.default = gulp.parallel(watch, server, minify, optimizeJS);
