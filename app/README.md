# WebView App

The following commands pertain to [Node.js](https://nodejs.org) application development. If you are compiling the Go binary see [Building the JavaScript app](https://github.com/nuxy/go-webview-app-builder?tab=readme-ov-file#building-the-javascript-app) for applicable build commands.

## Developers

### CLI options

Run [ESLint](https://eslint.org) on project sources:

    $ npm run lint

Transpile ES2017 sources (using [TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)) and minify to a distribution:

    $ npm run build

Launch a development server instance accessible at [http://localhost:9000](http://localhost:9000)

    $ npm run start
