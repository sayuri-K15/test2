'use strict';

let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass')
let del = require('del')
let plumber = require('gulp-plumber')




gulp.task('delHtml', function(){
  del(['html/**/*.html'])
})
gulp.task('delSass', function(){
  del(['html/css/**/*.css'])
})

gulp.task('copy', function() {
  return gulp.src([
      '_assets/**/*.html'
    ])
  .pipe(plumber())
  .pipe(gulp.dest('html/'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function(){
  return gulp.src([
      '_assets/sass/**/*.scss'
    ])
  .pipe(plumber())
  .pipe(sass({outputStyle:'expanded'}))
  .pipe(gulp.dest('html/css/'))
  .pipe(browserSync.stream())
})

gulp.task('default',['delHtml','delSass','copy','sass'], function(){
  browserSync.init({
    server: {baseDir: 'html'},
    browser: 'chrome'
  });
  gulp.watch(['_assets/**/*.html'],['delHtml','copy']);
  gulp.watch(['_assets/sass/**/*.scss'],['delSass','sass']);
});


