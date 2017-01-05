# A Lighthouse Style Guide: `devDependencies`

*Gulp...*

## Table of Contents

1. [Assets & Dist Folder](#1-assets-and-dist-folder)
2. [`npm`](#2-npm)
3. [`gulp`](#3-gulp)
4. [Laravel Elixir](#4-laravel-elixir)
5. [Webpack and Babel](5-webpack-and-babel)
6. [SVG](6-svg)
7. [Browsersync](7-browsersync)

## 1. Assets & Dist Folder

All your frontend assets live in the `assets` folder regardless of if any build process needs to happen to them.

The thinking behind this is two fold:

1. You will only work in one folder instead of jumping between `dist` and `assets`
2. You will never accidently edit files in `dist` as you are only ever working in `assets`

**N.B.** You should always add your dist folder to the `.gitignore`, compiled assets should never be checked in!

### Assets Structure

```
assets/
├── font/
├── img/
├── js/
├── scss/
└── svg/
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
```

For the most part the structure of the `dist` folder will mimic the assets folder except everything is compiled!

**N.B.** The `dist` folder should always be listed in your projects `.gitignore`.

## 2. `npm`

[`npm`](https://www.npmjs.com/) is the package manager for JavaScript and pretty much any fronent `devDependecies` we need. We us it to install and manage all of our projects fronent `devDependecies`.

You can easily install `npm` using [Homebrew](http://brew.sh/), which you should all get, with the following command:

`brew install node`

### `package.json`

Each project will have a [`package.json`](resources/package.json) file, this is what we check in to `git` to make sure everyone has all the dependencies they need to run the project. There is an example [`package.json`](resources/package.json) in this repo that contains all the `devDependencies` that are refered to in this README.md, this can be used as a starting point for new projects.

### Installing Dependencies

Installing new `dependencies` is done with the following command:

`npm install --save packagename`

Installing new `devDependencies` is done with the following command:

`npm install --save-dev packagename`

**N.B.** The difference between `dependencies` and `devDependencies` are that `devDependencies` are only used to build the project not run it. For example `gulp` is a `devDependency` where as `plyr` is a `dependency`.

### `scripts`

Every [`package.json`](resources/package.json) will have a [`scripts`](resources/package.json#L3) array, these are user defined commands that `npm` can run. Scripts can be run with the following command:

`npm run scriptname`

You should check these [`scripts`](resources/package.json#L3) to find out how to build a given project as well as anyother useful tasks.

## 3. `gulp`

[`gulp`](http://gulpjs.com/) is a task runner that we use to build our frontend assets as well as other monotonous tasks. It can be added as a `devDependency` for a given project by running the following command:

`npm install --save-dev gulp`

### `gulpfile.js`

Any project that uses `gulp` will have a [`gulpfile.js`](resources/gulpfile.js), this is where we define what tasks need to be run when building a project.

### Running `gulp`

There are two ways to run gulp:

1. Once
2. Watch

#### Once

When in the root of a project, you can run `gulp` once with the following command:

`./node_modules/.bin/gulp`

This isn't very nice so normally a script will be defined in the project's [`package.json`](resources/package.json) allowing you to run `gulp` once with the following command:

`npm run build`

**A Side Note**: When `npm` installs a dependency it that package has an excecutable is is place in `node_modules/.bin/`. When adding [`scripts`](resources/package.json#L3) to a [`package.json`](resources/package.json) you don't need to specify the directory path to an executable installed by `npm` as it knows to look there.

#### Watch

Watch keeps `gulp` running and based on the defined tasks will re-run tasks when files are changed. You can run `gulp` with watch with the following command:

`./node_modules/.bin/gulp watch`

Again like above this isn't very nice so normally a script will be defined in the project's [`package.json`](resources/package.json) allowing you to run `gulp watch` with the following command:

`npm run watch`

## 4. Laravel Elixir

`gulp` isn't very nice to use on its own but fortunately Laravel have created a lovely wrapper for tasks called [Elixir](https://laravel.com/docs/5.0/elixir). It can be added as a `devDependency` for a given project by running the following command:

`npm install --save-dev laravel-elixir`

The example [`gulpfile.js`](resources/gulpfile.js) has examples of how we use Elixir for various tasks.
