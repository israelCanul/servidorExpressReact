var gulp 	= require('gulp');
var babel 	= require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('jsx',function(){
    return gulp.src('./public/javascripts/src/*.jsx')
        .pipe(babel())
        .pipe(gulp.dest('./public/javascripts/build/dist'));
        //.pipe(gulp.dest('./public/javascripts/build'));	
});

// tarea css que verifica si hay cambios en los css 
gulp.task('css', function() {
        gulp.src('./public/stylesheets/*.css') 
            .pipe(require('gulp-livereload')(lr));
});
// tarea css que verifica si hay cambios en los js 
gulp.task('compress', function() {
  return gulp.src('./public/javascripts/build/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascripts/build/dist'));
});
// tarea css que verifica si hay cambios en los js 
gulp.task('jade', function() {
        gulp.src('./views/*.jade') 
        .pipe(require('gulp-livereload')(lr));
});

gulp.task('watch', function() {
        gulp.watch(['./public/javascripts/src/*.jsx'], ['jsx']); 
        gulp.watch(['./public/javascripts/build/*.js'], ['compress']);   
});

// tareas por defecto que lanzaran el watch
gulp.task('default', 
        ['watch']
);