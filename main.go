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
	"time"

	cache "github.com/patrickmn/go-cache"
	webview "github.com/webview/webview_go"

	"github.com/nuxy/go-webview-app-builder/lib"
)

import _ "embed"

//go:embed app/dist/main.bundle.js
var appBundle []byte

//go:embed app/index.tmpl
var indexTmpl []byte

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

	// Init temporary in-memory cache.
	c := cache.New(10 * time.Minute, 60 * time.Minute)

	// Launch WebView with Aurelia [SPA]
	bundle := strings.TrimSpace(string(appBundle))

	vars := lib.TmplVars{
		Title: windowTitle,
		JS: lib.EncodeData(bundle, "text/javascript"),
	}

	markup := lib.ReadHtml(string(indexTmpl), vars)

	w := webview.New(devTools)
	defer w.Destroy()

	// Define browser Window bindings.
	w.Bind("webview_Navigate", func(routeId string) {
		log.Printf("RouteId %s", routeId)

		c.Set("routeId", routeId, cache.NoExpiration)
	})

	w.Bind("webview_Terminate", func() {
		log.Printf("Terminate process")
	
		c.Flush()
	
		w.Terminate()
	})

	w.SetTitle(vars.Title)
	w.SetSize(windowWidth, windowHeight, webview.HintNone)
	w.SetHtml(markup)
	w.Run()
}
