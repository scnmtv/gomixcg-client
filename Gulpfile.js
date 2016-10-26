/**
 * Gulp configuration
 * Gulp is used as a task runner here. The actual build system for the Angular
 * app is Webpack. See webpack.config.js
 */

const {join, relative} = require('path').posix;
const {log, PluginError, colors} = require('gulp-util');
const {red, cyan, green, gray} = colors; // prudence!

const gulp = require('gulp');
const del  = require('del');
const seq  = require('run-sequence');
const pug  = require('gulp-pug');
const sass = require('gulp-sass');
const scmp = require('gulp-sourcemaps');

const webpack = require('webpack');
const browserSync = require('browser-sync').create();

const _src    = join.bind(global, './src');
const _dst    = join.bind(global, './dist');
const _map    = (arr, fn) => arr.map(k => fn(k)); // _map([...], _src/_dst) etc.
const _change = ev => { // event listener that just logs the changed file
	log(gray.underline(`${ev.type}: ${relative(__dirname, ev.path)}`));
	browserSync.notify(`${ev.type}: ${relative(__dirname, ev.path)}`);
};

const _wpConfig = require('./webpack.config');
const _wpCb = fn => (e, s) => {
	// this callback is to be called after webpack execution completes
	// template follows the webpack-callback function documented here:
	// https://webpack.github.io/docs/node.js-api.html
	// e: webpack error (if any)
	// s: webpack compilation stats (may still contain compilation errors)
	if (e)
		throw new PluginError('webpack', e);
	if (s.hasErrors())
		log(
			cyan('[webpack]'), red.bold('compilation errors:') +
			s.toString('errors-only')
		);
	else
		log(
			cyan('[webpack]'), green.bold('compiled:') + '\n' +
			s.toString('normal')
		);

	// dirty hack to let browserSync know when webpack is compiled, so instead of
	// reloading, the webpack bundle is 'injected' into the browser instances
	gulp.src(_dst('*.js')).pipe(browserSync.stream());
	return fn && fn(); // if there's a callback...
};

const _sassOpts = {
	includePaths: join('.', 'node_modules', 'bootstrap', 'scss'),
	outputStyle: _wpConfig.inProduction() ? 'compressed' : 'expanded',
	sourceMap: true,
};

const _bsConfig = {
	server: _dst(),
	port: 3000,
};

/** ***************************************************************************
 * Gulp tasks! (Run `gulp tasks` to list all available tasks)
 *************************************************************************** **/

// ------------------------------------------------------------------- clean[:*]
gulp.task('clean', del.bind(global, _dst()));
gulp.task('clean:index', del.bind(global, _dst('index.html')));
gulp.task('clean:css', del.bind(global, _map(['*.css', '*.css.map'], _dst)));
gulp.task('clean:app', del.bind(global, _map(['*.js', '*.js.map'], _dst)));

// ------------------------------------------------------------------ make:index
gulp.task('make:index', ['clean:index'], _ => gulp
	.src(_src('index.pug'))
	.pipe(pug())
	.pipe(gulp.dest(_dst()))
	.pipe(browserSync.stream())
);

// -------------------------------------------------------------------- make:css
gulp.task('make:css', ['clean:css'], _ => gulp
	.src(_src('root.scss'))
	.pipe(scmp.init())
	.pipe(sass(_sassOpts))
	.pipe(scmp.write('./'))
	.pipe(gulp.dest(_dst()))
	.pipe(browserSync.stream())
);

// -------------------------------------------------------------------- make:app
gulp.task('make:app', ['clean:app'], done =>
	webpack(_wpConfig, _wpCb(done))
);

// ------------------------------------------------------------------------ make
gulp.task('make', done =>
	seq('clean', ['make:index', 'make:css', 'make:app'], done)
);

// --------------------------------------------------------- watch:setup.webpack
gulp.task('watch:setup.webpack', done => {
	webpack(
		Object.assign({}, _wpConfig, {watch: true}),
		_wpCb()
	);

	log(
		cyan('[webpack]'),
		gray.underline('watching src/*.ts & src/app/**/* for changes')
	);

	done();
});

// ----------------------------------------------------------------- watch:setup
gulp.task('watch:setup', done => {
	gulp.watch([_src('*.scss'), _src('include', '**', '*.scss')], ['make:css'])
		.on('change', _change);
	log(
		cyan('[sass]'),
		gray.underline('watching src/**/*.scss for changes')
	);

	gulp.watch(_src('index.pug'), ['make:index'])
		.on('change', _change);
	log(
		cyan('[pug]'),
		gray.underline('watching src/index.pug for changes')
	);

	gulp.watch([_src('*.ts'), _src('app', '**', '*')], [])
		.on('change', _change);

	done();
});

// ----------------------------------------------------------------------- watch
gulp.task('watch', done => {
	if (_wpConfig.inProduction())
		log(red('it is highly unadvisable to run watch in production mode'));

	seq(
		['clean'],
		['make:index', 'make:css', 'watch:setup.webpack'],
		['watch:setup'],
		() => {
			log(gray.underline('all watches have been set up.'));
			done();
		}
	);
});

// ----------------------------------------------------------------------- serve
gulp.task('serve', ['watch'], done => {
	browserSync.init(_bsConfig);
	browserSync.watch(_dst('*'));
});

// ----------------------------------------------------------------------- tasks
gulp.task('tasks', done => {
	// just lists all the available tasks and exits
	log(green.bold('all available tasks:'));
	console.log('       --------------------------------');
	Object.keys(gulp.tasks)
		.map(t => t.indexOf(':') < 0 ? cyan.bold(t) : gray(t))
		.forEach(t => console.log('       ==>', t));
	console.log('       --------------------------------');
	done();
});

// --------------------------------------------------------------------- default
gulp.task('default', done => seq('make', done));
