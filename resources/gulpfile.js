var elixir = require('laravel-elixir');

/**
 * Requires
 */
require('laravel-elixir-svg-symbols');

/**
 * A recommended assets folder structure
 *
 * /assets
 *   /font
 *   /img
 *   /js
 *   /scss
 *   /svg
 *
 * Note that each folder is singular!
 */

/**
 * Config
 */
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./.gulprc', 'utf8'));

// This is where all of your non-compiled assets live.
elixir.config.assetsPath = 'assets';
// This is where your compiled assets should be found.
elixir.config.publicPath = 'dist';

elixir.config.notifications = config.notifications;

// This is the directory within your assets folder that contains
// all of your scss files.
elixir.config.css.sass.folder = 'scss';
elixir.config.css.sass.search = '/**/*.scss';

/**
For setting autoprefix options - leave `cascade: false` untouched.
IE10 supports prefixed-only Flexbox!

 elixir.config.css.autoprefix.options = {
    browsers: [
        'last 2 versions',
        'IE 9',
        'IE 10',
        'IE 11',
        ],
    cascade: false,
}
**/

// This is the dev url that Browsersync should proxy to localhost.
elixir.config.browserSync.proxy = config.browserSync.proxy;

/**
 * Mix!
 */
elixir(function(mix) {
    /**
     * Copy files!
     *
     * Any assets that are not written by us, like fonts and images, should
     * just be copied.
     *
     * The reason we don't just put them in the public path is so that you
     * are not working between two directories. This also means me can just
     * add the public path to our .gitignore!
     */
    mix.copy(
        elixir.config.assetsPath + '/font',
        elixir.config.publicPath + '/font'
    );
    mix.copy(
        elixir.config.assetsPath + '/img',
        elixir.config.publicPath + '/img'
    );

    /**
     * JavaScript
     *
     * Compiles assets/js/main.js to dist/js/main.js
     */
    mix.webpack('main.js');

    /**
     * SCSS
     *
     * Compiles assets/scss/style.scss to dist/css/style.css.
     */
    mix.sass('style.scss');

    /**
     * SVG Symbols
     *
     * Copys all SVGs to the public path as well as creating a symbol.svg.
     */
    mix.svgSprite(
        elixir.config.assetsPath + '/svg/sprite',
        elixir.config.publicPath + '/svg'
    );

    /**
     * Browsersync
     *
     * Add any directories that should affect when your page
     * is refreshed.
     */
    mix.browserSync({
        files: [
            elixir.config.publicPath + '/' + elixir.config.css.outputFolder + '/**/*.css',
            elixir.config.publicPath + '/' + elixir.config.js.outputFolder + '/**/*.js',
        ]
    });
});
