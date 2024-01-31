// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const browsersync = require('browser-sync').create();

const pages = ['404', 'main']

// File paths
const files = {
	scssPath: 'app/scss/**/*.scss',
	jsPath: 'app/js/**/*.js',
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
	return src(files.scssPath, { sourcemaps: true }) // set source and turn on sourcemaps
		.pipe(sass()) // compile SCSS to CSS
		.pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
		.pipe(dest('assets/css', { sourcemaps: '.' })); // put final CSS in dist folder with sourcemap
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
	return src(
		[
			files.jsPath,
			//,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
		],
		{ sourcemaps: true }
	)
		//.pipe(concat('all.js'))
		.pipe(terser())
		.pipe(dest('assets/js', { sourcemaps: '.' }));
}

// Cachebust
function cacheBustTask() {
	var cbString = new Date().getTime();
	return src(['_site/index.html', '_site/about/index.html', '_site/artworks/index.html', '_site/404.html'])
		.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
		.pipe(dest(function(file) {
			return file.base;
		  }));
}

function watchJSTask() {
	watch(
		[files.jsPath],
		{ interval: 1000, usePolling: true }, //Makes docker work
		jsTask
	);
}

function watchSCSSTask() {
	watch(
		[files.scssPath],
		{ interval: 1000, usePolling: true }, //Makes docker work
		scssTask
	);
}

exports.default = series(parallel(scssTask, jsTask), parallel(watchJSTask, watchSCSSTask));
