const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');

const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');

const sass_files = 'src/styles/**/*.scss';
const scripts = 'src/scripts/*.js';
const html_files = '*.html';
const images = 'src/img/*.*';
const product_images = 'src/img/products/*.*'

// Default development task to build Sass files and watch for changes in HTML and Sass
gulp.task('default', ['sassBuild', 'jsBrowserify'], function () {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "./index.html"
    }
  });
  gulp.watch(sass_files, ['watchSass']).on('change', function(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...')
  });
  gulp.watch(html_files, ['watchHTML']).on('change', function(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...')
  });
  gulp.watch(scripts, ['watchScripts']).on('change', function(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...')
  });
});



// JavaScript Minification

gulp.task('concatJS', function() {
  return gulp.src(['./src/scripts/scripts.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./src/scripts'));
});
gulp.task('jsBrowserify', ['concatJS'] , function() {
  return browserify({ entries: ['./src/scripts/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./src/scripts'));
});
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./src/scripts/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./src/scripts"));
});



// Tasks that run during development, watching for changes
gulp.task('sassBuild', function() {
  return gulp.src(sass_files)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/styles'));
});
gulp.task('watchSass', ['sassBuild'], function(){
  browserSync.reload();
});
gulp.task('watchHTML', function() {
  browserSync.reload();
});
gulp.task('watchScripts', ['jsBrowserify'], function() {
  browserSync.reload();
});

// Image resizing
gulp.task('resizeProductImages', function () {
  gulp.src(product_images)
    .pipe(imageResize({
      width : 250,
      height : 250,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('src/img/'));
});

// Production build tasks
gulp.task('clean', function(){
  return del('public/*');
});
gulp.task('prodBuild:styles', function(){
  return gulp
    .src(sass_files)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/src/styles'));
});
gulp.task('prodBuild:scripts', ['minifyScripts'], function() {
  return gulp.src(scripts).pipe(gulp.dest('public/src/scripts'));
});
gulp.task('prodBuild:pages', function(){
  return gulp.src(html_files).pipe(gulp.dest('public'));
});
gulp.task('prodBuild:images', function(){
  return gulp.src(images)
    .pipe(imagemin())
    .pipe(gulp.dest('public/src/img'));
});
gulp.task('prodBuild', ['prodBuild:styles', 'prodBuild:scripts', 'prodBuild:pages', 'prodBuild:images']);
