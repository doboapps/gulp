
/* ======================================================================================================
* Plugins utilizados
* ======================================================================================================*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

/* ======================================================================================================
* Tarea sobre los Estilos
* ======================================================================================================*/
gulp.task('styles', function () {
    gulp.src("./src/scss/*.scss")//obtiene todos los archivos con extesion sass
    .pipe(sourcemaps.init())
    .pipe( sass({//preprocesa el archivo
            includePaths: require('node-bourbon').includePaths,
            style: 'compressed',
          })
    ).on('error', notify.onError(function (error) {//si hay un error muestralo por consola
       return 'Error al compilar sass.\n Detalles en la consola.\n' + error;
    }))
   .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest("./dist/css/"))//destino de los archivos
   .pipe(notify({ title: "SASS", message: "OK: Archivo compilado" }))//si ok notificalo
   .pipe(browserSync.stream());
});

/* ======================================================================================================
* Tarea sobre los Scripts (concatena archivos js)
* ======================================================================================================*/
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')//todos los archivos js
    .pipe(concat('all.js'))//concatenalos y ponlos en all.js
    .pipe(uglify())//modulo que convierte el codigo js a una especie de archivo .min.js
    .pipe(gulp.dest('./dist/js/'));//envialo a tal destino
});


/* ======================================================================================================
* Browser Sync
* ======================================================================================================*/
gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,//si detecta cambios en estos archivos actualiza el navegador
        files: ['*.html', './dist/**/*.{html,css,js}'],
        server: "./",
    });
});


/* ======================================================================================================
* Tarea por default
* ======================================================================================================*/
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['styles']); // Vigila cambios en los estilos
    gulp.watch('./src/js/*.js', ['scripts']); // vigila cambios en los js
});


/* ======================================================================================================
* Default Task (tarea por defecto al ejecutar comando gulp)
* ======================================================================================================*/
gulp.task('default', ['styles', 'scripts', 'browser-sync', 'watch',]);
