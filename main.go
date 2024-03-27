//
//  go-webview-app-builder
//  Create a Aurelia JavaScript application in a WebView
//
//  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
//  Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

package main

import (
	_ "embed"

	"github.com/nuxy/go-webview-app-builder/lib"
)

//go:embed app/dist/main.bundle.js
var appBundle []byte

//go:embed app/index.tmpl
var indexTmpl []byte

//
// Let's get this party started.
//
func main() {
	storage := lib.NewStorage()
	htmlDoc := lib.GenHtmlMarkup(string(appBundle), string(indexTmpl))
	browser := lib.NewBrowser(htmlDoc)

	// Define browser Window bindings.
	browser.Bind("browser_Navigate", func(routeId string) {
		storage.Set("routeId", routeId)
	})

	browser.Bind("browser_Terminate", func(_ string) {	
		storage.Clear()
		browser.Close()
	})

	browser.Debug(false)
	browser.Open()
}
