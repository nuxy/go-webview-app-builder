# WebView App Builder

Create a [Aurelia](https://aurelia.io) JavaScript application in a [WebView](https://en.wikipedia.org/wiki/WebView). :warning: Work In Progress :warning:

## Dependencies

- [Go](https://golang.org)
- [Node.js](https://nodejs.org)

### Ubuntu

    $ apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev

## Build from source

Install the new build using [gmake](https://www.gnu.org/software/make).

    $ make install

Cross-compile to support [Windows](https://golang.org/dl/go1.15.6.windows-amd64.msi), [OSX](https://golang.org/dl/go1.15.6.darwin-amd64.pkg), [etc](https://golang.org/dl) ..

    $ make build-<darwin|linux|windows>

### Building the JavaScript app

Install the [Node.js](https://nodejs.org) application dependencies using [NPM](https://npmjs.com):

    $ make install-app

Transpile ES2017 sources (using [TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)) and minify to a distribution:

    $ make build-app

## Running the application

Once compiled it should be as easy as..

    $ webview-app

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_go-webview-app-builder_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
