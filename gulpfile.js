var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('hello', function() {
    console.log('hello')
})

gulp.task('sass', function() {
    return gulp.src('app/scss/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('useref', function() {
    return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
    
})

gulp.task('watch', ['browserSync', 'sass', 'useref'], function() {
    gulp.watch('app/scss/index.scss', ['sass']);
    gulp.watch('app/index.html', browserSync.reload)
    gulp.watch('app/js/*.js', browserSync.reload)
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

