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
	"log"
	"strings"

	webview "github.com/webview/webview_go"

	"github.com/nuxy/go-webview-app-builder/lib"
)

const (
	windowTitle  string = "WebView App"
	windowHeight int    = 320
	windowWidth  int    = 480
	devTools     bool   = true;
)

//
// Let's get this party started.
//
func main() {

	// Launch WebView with Aurelia [SPA]
	jsModules := lib.ReadFile("app/dist/main.bundle.js")
	jsModules = strings.TrimSpace(jsModules)

	vars := lib.TmplVars{
		Title: windowTitle,
		JS: lib.EncodeData(jsModules, "text/javascript"),
	}

	markup := lib.ReadHtml("app/index.tmpl", vars)

	w := webview.New(devTools)
	defer w.Destroy()

	// Define browser Window bindings.
	w.Bind("webview_Navigate", func(routeId string) {
		log.Printf("RouteId %s", routeId)
	})

	w.Bind("webview_Terminate", func() {
		log.Printf("Terminate process")
	
		w.Terminate()
	})

	w.SetTitle(vars.Title)
	w.SetSize(windowWidth, windowHeight, webview.HintNone)
	w.SetHtml(markup)
	w.Run()
}
