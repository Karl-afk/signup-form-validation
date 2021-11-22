
// Import important packages
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');

// SASS -> CSS
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('sass');
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var criticalCss = require('gulp-critical-css');

// HTML
const htmlmin = require('gulp-htmlmin');

// JavaScript
const babel = require('gulp-babel')
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');

// Define important variables
const src = './src';
const dest = './dist';

const reload = (done) => {
    browserSync.reload();
    done();
};

const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: dest
        }
    });
    done();
};

const critical = () => {
    return gulp.src(`${dest}/css/main.css`)
    .pipe(criticalCss())
    .pipe(gulp.dest(`${dest}/css/`))
}

const css = () => {
    return gulp.src(`${src}/sass/**/*.sass`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(`${dest}/css`))
    .pipe(sass.sync({outputStyle: "compressed"})).on('error', sass.logError)
    .pipe(rename({basename: 'main', suffix: '.min'}))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(`${dest}/css`))
    .pipe(browserSync.stream());
};

const html = () => {
    return gulp.src(`${src}/*.html`)
    .pipe(plumber())
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        html5: true,
        removeEmptyAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true
    }))
    .pipe(gulp.dest(`${dest}`));
};

const script = () => {
    return gulp.src(`${src}/js/*.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('concat.js'))
    .pipe(babel({presets: ["@babel/preset-env"]}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(rename({ basename: 'main', suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${dest}/js`))
    .pipe(browserSync.stream());
};

const watch = () => gulp.watch([`${src}/sass/**/*.sass`, `${src}/*.html`, `${src}/js/**/*.js`], gulp.series(script ,html, css, reload));

const dev = gulp.series(script, html, css, critical, serve, watch);

const build = gulp.series(script, html, css);

exports.dev = dev;
exports.build = build;
exports.default = build;