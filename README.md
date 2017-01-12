# A Lighthouse Style Guide: `devDependencies`

*Gulp...*

## Table of Contents

1. [The `assets` & `dist` Folders](#1-the-assets--dist-folders)
2. [`npm`](#2-npm)
3. [`gulp`](#3-gulp)
4. [`elixir`](#4-elixir)
5. [`webpack` & Babel](#5-webpack--babel)
6. [Browsersync](#6-browsersync)
7. [SVGs](#7-svgs)

## 1. The `assets` & `dist` Folders

All your frontend assets live in the `assets` folder regardless of whether any build process needs to happen to them.

The thinking behind this is twofold:

1. You will only work in one folder instead of jumping between `dist` and `assets`
2. You will never accidentally edit files in `dist` as you are only ever working in `assets`

**N.B.** You should always add your dist folder to the `.gitignore`, compiled assets should never be checked in!

### Assets Structure

```
assets/
├── font/
├── img/
├── js/
├── scss/
└── svg/
    └── mask/
    └── single/
    └── sprite/
```

All folders within the `assets` folder should be singular, this is to create a more readable path to the file. For example `/dist/svg/sprite/arrow.svg`.

### Dist Structure

```
dist/
├── font/
├── img/
├── js/
├── css/
└── svg/
    └── mask/
    └── single/
    └── sprite.svg
```

For the most part the structure of the `dist` folder will mimic the assets folder - except that everything is compiled! The `dist` folder is also where you will reference all of your assets from (**not** the `assets` folder).

**N.B.** The `dist` folder should always be listed in your projects `.gitignore`.

## 2. `npm`

[`npm`](https://www.npmjs.com/) is the package manager for JavaScript and pretty much any frontend `devDependencies` we need. We use it to install and manage all of our projects' frontend `devDependencies`.

You can easily install `npm` using [Homebrew](http://brew.sh/), which you should all get, with the following command:

`brew install node`

### `package.json`

Each project will have a [`package.json`](resources/package.json) file, which we check-in to `git` to make sure everyone has all of the dependencies they need to run the project. There is an example [`package.json`](resources/package.json) in this repo that contains all of the `devDependencies` that are referred to in this README.md.

### Installing Dependencies

To install dependencies you need to run the following commands from within the same directory as `package.json`.

Installing new `dependencies` is done with the following command:

`npm install --save packagename`

Installing new `devDependencies` is done with the following command:

`npm install --save-dev packagename`

**N.B.** The difference between `dependencies` and `devDependencies` are that `devDependencies` are only used to build the project, not run it. For example `gulp` is a `devDependency` where as `plyr` is a `dependency`.

### `scripts`

Every [`package.json`](resources/package.json) will have a [`scripts`](resources/package.json#L3) array, these are user defined commands that `npm` can run. Scripts can be run with the following command:

`npm run scriptname`

You should check these [`scripts`](resources/package.json#L3) to find out how to build a given project as well as any other useful tasks.

## 3. `gulp`

[`gulp`](http://gulpjs.com/) is a task runner that we use to build our frontend assets as well as other monotonous tasks. It can be added as a `devDependency` for a given project by running the following command:

`npm install --save-dev gulp`

### `gulpfile.js`

Any project that uses `gulp` will have a [`gulpfile.js`](resources/gulpfile.js), this is where we define what tasks need to be run when building a project.

### `.gulprc.example` & `.gulprc`

`.gulprc` is used to configure gulp on a per user basis and as such should be added to the projects `.gitignore` and not checked-in. [`.gulprc.example`](resources/.gulprc.example) should be added to all projects and checked-in to be used as a template for each user's `.gulprc`.

**N.B.** The way we have our starting [`gulpfile.js`](resources/gulpfile.js) setup means `gulp` will **not** work without a `.gulprc`.

### Running `gulp`

There are two ways to run gulp:

1. Once
2. Watch

#### Once

When in the root of a project, you can run `gulp` once with the following command:

`./node_modules/.bin/gulp`

This isn't very nice so normally a script will be defined in the project's [`package.json`](resources/package.json) allowing you to run `gulp` once with the following command:

`npm run build`

**A Side Note**: When `npm` installs a dependency if that package has an executable it is placed in `node_modules/.bin/`. When adding [`scripts`](resources/package.json#L3) to a [`package.json`](resources/package.json) you don't need to specify the directory path to an executable installed by `npm` as it knows to look there.

#### Watch

Watch keeps `gulp` running and based on the defined tasks will re-run tasks when files are changed. You can run `gulp` with watch with the following command:

`./node_modules/.bin/gulp watch`

Again like above this isn't very nice so normally a script will be defined in the project's [`package.json`](resources/package.json) allowing you to run `gulp watch` with the following command:

`npm run watch`

## 4. `elixir`

`gulp` isn't very nice to use on its own but fortunately Laravel have created a lovely wrapper for tasks called [`elixir`](https://laravel.com/docs/5.0/elixir). It can be added as a `devDependency` for a given project by running the following command:

`npm install --save-dev laravel-elixir`

The example [`gulpfile.js`](resources/gulpfile.js) has examples of how we use Elixir for various tasks.

## 5. `webpack` & Babel

[`webpack`](https://webpack.github.io/) is a module bundler for JavaScript, it is what we use to concatenate, minify and generally magic our JavaScript into being production ready. [Babel](https://babeljs.io/) is a JavaScript compiler that allows us to write modern JavaScript ([ES6](http://es6-features.org/)) without having to worry about browser support, well not too much...

### `webpack`

To use webpack you simply need to install the `elixir` `webpack` task with the following command:

`npm install --save-dev laravel-elixir-webpack-official`

An example of how to run `webpack` as a task is in our starting [`gulpfile.js`](resources/gulpfile.js#L70).

#### More advance `webpack` stuff...

[`webpack.config.js`](resources/webpack.config.js) is used to configure `webpack` and should be placed in the root of your project. Our starting [`webpack.config.js`](resources/webpack.config.js) is specifying what the bundled output should be called and what loaders we are using. Loaders are pretty much what allow us to `require()` things in our JavaScript files.

The following loaders are specified in our starting [`webpack.config.js`](resources/webpack.config.js):

* `babel-loader` - This allows us to write our files in ES6 and when it is bundled it will also be compiled
* `style-loader` - This allows us to `require()` style sheets in our JavaScript. When this is done they are injected into the page using `<style>` tags.

To add these loaders as `devDependencies` for a given project run the following command:

`npm install --save-dev babel-core babel-loader babel-plugin-transform-object-rest-spread babel-preset-es2015 css-loader style-loader`

### Babel

[`.babelrc`](resources/.babelrc) is used configure Babel and should also placed in the root of your project. Our starting [`.babelrc`](resources/.babelrc) creates sourcemaps and included the [`es2015`](https://babeljs.io/docs/plugins/preset-es2015/), this is what allows us to use all the new fun functionality.

## 6. Browsersync

[Browsersync](https://www.browsersync.io/) is magic and all frontend developers should use it! To use Browsersync you need to install the `elixir` wrapper to your projects `devDependencies` with the following command:

`npm install --save-dev laravel-elixir-browsersync-official`

An example of how to configure the `browserSync` task can be found in our starting [`gulpfile.js`](resources/gulpfile.js#L95).

## 7. SVGs

Projects tend to call for three types of SVG:

1. Sprites
2. Masks
3. Single-use / Unique

### Sprites & `svgSprite`

We generate a spritesheet of our re-useable, re-styleable SVG's with `svgSprite`.

`svgSprite` is an `elixir` task that takes every SVG in your `svg/sprite/` folder, and creates a single `sprite.svg`. This new SVG wraps each sprite in a `<symbol>`, which you can reference in a `<use>` tag.

An example of how to configure the `svgSprite` task can be found in our starting [`gulpfile.js`](resources/gulpfile.js#L84).

### Masks

If you're creating an SVG to use as a mask, it's likely that you're referring to it from a stylesheet. In this case - store the `file.svg` inside of an `/assets/svg/mask` folder, and refer to it in `/dist/`.

### Single-use / Unique

Sometimes you'll create a large, complex SVG with built-in animation and specific ID's to attach events to (you clever clogs). As we don't need to load this _everywhere_, we store in the `/svg/single/` folder and reference it from there.
