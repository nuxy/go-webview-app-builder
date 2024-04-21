# WebView App Builder [![](https://img.shields.io/badge/go%20report-A+-brightgreen.svg?style=flat)](https://goreportcard.com/report/github.com/nuxy/go-webview-app-builder) [![](https://img.shields.io/github/v/release/nuxy/go-webview-app-builder)](https://github.com/nuxy/go-webview-app-builder/releases)

Create a JavaScript [single-page application](https://en.wikipedia.org/wiki/Single-page_application) (SPA) in a [WebView](https://en.wikipedia.org/wiki/WebView)

![Preview](https://raw.githubusercontent.com/nuxy/go-webview-app-builder/master/example.png)

## The Problem

Due to browser [Cross-origin resource sharing](https://www.w3.org/TR/2020/SPSD-cors-20200602) (CORS) restrictions WebView application sources and related data **must be served from a privileged authority** that defines a properly configured `Access-Control-Allow-Origin` header. In an embedded source application, where HTTP sources are served locally, the WebView uses an unprivileged authority `about:blank` that results with errors when using [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), or [Cookie Store](https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store) APIs.

This package does the following to workaround this:

1. Provides [interfaces](https://github.com/nuxy/go-webview-app-builder/blob/develop/app/src/webview) to bridge communication between JavaScript [_senders_](https://github.com/nuxy/go-webview-app-builder?tab=readme-ov-file#javascript-sender-example) and Go app [_receivers_](https://github.com/nuxy/go-webview-app-builder?tab=readme-ov-file#go-app-receiver-example).
2. Embeds all fonts, images, sounds, etc.. as [Base64](https://en.wikipedia.org/wiki/Base64) encoded strings to be used in CSS/JavaScript includes.
3. Transpiles SPA sources to a single file bundle which is front-loaded on Go application initialization using [`data:`](https://developer.mozilla.org/en-US/docs/web/http/basics_of_http/data_urls)
4. Compiles Go application and packages SPA sources into a small, self contained binary.

This creates a fast loading, dynamically-driven, desktop application running your favorite SPA framework.

## Dependencies

- [Go](https://golang.org)
- [Node.js](https://nodejs.org)

### Debian/Ubuntu

The following dependencies are required in order to build for Debian-based operating systems.  For alternate OS's (e.g. BSD, Windows) refer to the [webview preqequisites](https://github.com/webview/webview?tab=readme-ov-file#prerequisites) install instructions.

    $ apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev

## Quick and Easy

Transpile the SPA, compile the Go application, and run the example in one command:

    $ make

## Build from source

Install the new build using [gmake](https://www.gnu.org/software/make).

    $ make install

Cross-compile to support [Windows](https://golang.org/dl/go1.15.6.windows-amd64.msi), [OSX](https://golang.org/dl/go1.15.6.darwin-amd64.pkg), [etc](https://golang.org/dl) ..

    $ make build-<darwin|linux|windows>

Note: Using `--debug` will enable WebView browser [Developer Tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools) and development mode in the JavaScript application.

### Building the JavaScript app

Install the [Node.js](https://nodejs.org) application dependencies using [NPM](https://npmjs.com):

    $ make webview-app-install

Transpile ES2017 sources (using [TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)) and minify to a distribution:

    $ make webview-app-build

## Running the application

Once compiled it should be as easy as..

    $ webview-app

## Go application structure

```text
app             // SPA sources (Aurelia 2 framework example)
app/index.tmpl  // File to be imported into the WebView (via webview_go)
app/src/webview // JS libraries (Go app bindings, e.g. senders)
lib             // Go package dependencies.
app.go          // main (Go app bindings, e.g receivers)
```

## Supported app bindings

The following `window` [functions](https://github.com/nuxy/go-webview-app-builder/tree/develop/app/src/webview) are accessible when the app is executed in a Go context.  When run using [NPM](https://docs.npmjs.com/cli/v7/commands/npm-start) the functions fallback to local equivalents, if supported.

| Name                     | Description                                 | Fallback    |
|--------------------------|---------------------------------------------|-------------|
| `browser_AppVersion`     | Returns the Go application defined version. | N/A         |
| `browser_HttpGet`        | Make HTTP GET request to a remote source.   | [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |
| `browser_HttpHead`       | Make HTTP HEAD request to a remote source.  | Fetch API   |
| `browser_HttpPost`       | Make HTTP POST request to a remote source.  | Fetch API   |
| `browser_Navigate`       | Store data that references current screen.  | N/A         |
| `browser_OpenExtBrowser` | Opens URL in an external web browser.       | N/A         |
| `browser_StorageDelete`  | Removes stored item from in-memory cache.   | [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API) |
| `browser_StorageSet`     | Add data to be stored in-memory cache.      | Storage API |
| `browser_StorageGet`     | Returns data from in-memory cache.          | Storage API |
| `browser_Terminate`      | Close the WebView (terminate session).      | N/A         |

## Usage

The following illustrates the most typical use case.

```javascript
import {AppRequest} from './webview/http';
import {AppStorage} from './webview/storage';

const appReq = new AppRequest();
const result = await appReq.get('https://domain.com/api');
const {Status, Headers, Body} = result;

// parse value, cache locally.
const value = JSON.parse(Body).uuid;

await AppStorage.set('api-uuid', value);

// .. and later in code
const uuid = AppStorage.set('api-uuid');
```

## Adding custom bindings

### Go app receiver example

```go
import "github.com/nuxy/go-webview-app-builder/lib"

// Browser settings (defaults).
var settings = lib.BrowserSettings{
    Title:  "WebView App",
    Height: 768,
    Width:  1024,
    Resize: true,
    Debug:  false,
}

func main() {
    browser := lib.NewBrowser('<html></html>', settings)

    // Concatenate string arguments and return result to JavaScript sender.
    browser.BindFuncReturn("browser_ConcatStrings", func(arg ...string) string {
        return arg[0] + arg[1] + arg[2]
    })

    // Pass arguments to Go function. Returns nothing to JavaScript sender.
    browser.BindFuncVoid("browser_ProcessString", func(arg ...string) {
        myCustomFunction(arg[0])
    })

    ...
}
```

### JavaScript sender example

```javascript
import {webViewBindExists} from './webview/utils';

// Concatenate string arguments.
async function concatStrings(v1, v2, v3) {
  const bindingName = 'browser_ConcatStrings';

  if (webViewBindExists(bindingName)) {
    return await window[bindingName](v1, v2, v3);
  }

  throw new Error(`Go receiver "${bindingName}" doesn't exist`);
}

// Process the string argument.
async function executeAndVoid(v) {
  const bindingName = 'browser_ProcessString';

  if (webViewBindExists(bindingName)) {
    return await window[bindingName](v);
  }

  throw new Error(`Go receiver "${bindingName}" doesn't exist`);
}
```

## References

- [webview_go](https://github.com/webview/webview_go) - Go language binding for the webview library.

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you run [golint](https://github.com/golang/lint) and [gofmt](https://pkg.go.dev/cmd/gofmt) on contributed files).

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_go-webview-app-builder_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
