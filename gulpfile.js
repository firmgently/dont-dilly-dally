var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    output_dir = "js",
    in_ar = [
      'src/DDDConsts.js',
      'src/FGUtils.js',
      'src/DontDillyDally.js'
    ];

gulp.task('js-fef', function(){
    return gulp.src(in_ar)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_concat('FGDontDillyDally-concat.js'))
        .pipe(gulp.dest(output_dir))
        .pipe(gp_rename('FGDontDillyDally.js'))
        .pipe(gp_uglify())
        .pipe(gp_sourcemaps.write('./'))
        .pipe(gulp.dest(output_dir));
});

gulp.task('default', ['js-fef'], function(){});
