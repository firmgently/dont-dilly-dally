var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    // gp_minify = require('gulp-minify-css'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    output_dir = 'js',
    output_filename = 'FGDontDillyDally',
    jsFilesIn_ar = [
      'src/FGUtils.js',
      'src/FGHTMLBuild.js',
      'src/DDDConsts.js',
      'src/DontDillyDally.js'
    ];

gulp.task('js-concat-uglify', function(){
    return gulp.src(jsFilesIn_ar)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_concat(output_filename + '-concat.js'))
        .pipe(gulp.dest(output_dir))
        .pipe(gp_rename(output_filename + '.js'))
        .pipe(gp_uglify())
        .pipe(gp_sourcemaps.write('./'))
        .pipe(gulp.dest(output_dir));
});
/*
gulp.task('css', function(){
   gulp.src('src/styles/*.css')
   .pipe(concat('styles.css'))
   .pipe(minify())
   .pipe(gulp.dest('css/'));
});*/

gulp.task('default', ['js-concat-uglify'], function(){});
// gulp.task('default', ['js-fef', 'css'], function(){});
