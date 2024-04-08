# WebView App Builder

Create a JavaScript [single-page application](https://en.wikipedia.org/wiki/Single-page_application) (SPA) in a [WebView](https://en.wikipedia.org/wiki/WebView) :warning: Work in Progress :warning:

## Dependencies

- [Go](https://golang.org)
- [Node.js](https://nodejs.org)

### Debian/Ubuntu

    $ apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev

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
app         // SPA sources (Aurelia 2 framework example)
lib         // Go package dependencies.
app.go      // main
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
async function concatStrings(v1: string, v2: string, v3: string): Promise<string> {
  const bindingName = 'browser_ConcatStrings';

  return (webViewBindExists(bindingName))
    ? await window[bindingName](v1, v2, v3)
    : Promise.reject(`Go receiver "${bindingName}" doesn't exist`);
}

// Process the string argument.
async function executeAndVoid(v: string): Promise<void> {
  const bindingName = 'browser_ProcessString';

  return (webViewBindExists(bindingName))
    ? await window[bindingName](v)
    : Promise.reject(`Go receiver "${bindingName}" doesn't exist`);
}
```

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_go-webview-app-builder_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
