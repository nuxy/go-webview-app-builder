//
//  go-webview-app-builder
//  Create a JavaScript single-page application (SPA) in a WebView
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

//go:embed app/examples/aurelia/dist/main.bundle.js
var appBundle []byte

//go:embed app/examples/aurelia/index.tmpl
var indexTmpl []byte

// Makefile linker variables
var Version string
var DevTools string

// Browser settings (defaults).
var settings = lib.BrowserSettings{
	Title:  "WebView App",
	Height: 590,
	Width:  620,
	Resize: true,
	Debug:  lib.StrToBool(DevTools),
}

// Let's get this party started.
func main() {
	storage := lib.NewStorage()
	request := lib.NewRequest()
	htmlDoc := lib.GenHtmlMarkup(string(appBundle), string(indexTmpl))
	browser := lib.NewBrowser(htmlDoc, settings)

	// Define browser WebView global bindings.
	// @see app/examples/aurelia/webview/bindings.d.ts
	browser.BindFuncReturn("browser_AppVersion", func(_ ...string) string {
		return Version
	})

	browser.BindFuncReturn("browser_HttpGet", func(arg ...string) string {
		return request.Get(arg[0]).JsonResponse()
	})

	browser.BindFuncReturn("browser_HttpHead", func(arg ...string) string {
		return request.Head(arg[0]).JsonResponse()
	})

	browser.BindFuncReturn("browser_HttpPost", func(arg ...string) string {
		return request.Post(arg[0], arg[1], arg[2]).JsonResponse()
	})

	browser.BindFuncVoid("browser_Navigate", func(arg ...string) {
		storage.Set("routeId", arg[0])
	})

	browser.BindFuncVoid("browser_OpenExtBrowser", func(arg ...string) {
		lib.OpenExtBrowser(arg[0])
	})

	browser.BindFuncVoid("browser_StorageDelete", func(arg ...string) {
		storage.Delete(arg[0])
	})

	browser.BindFuncVoid("browser_StorageSet", func(arg ...string) {
		storage.Set(arg[0], arg[1])
	})

	browser.BindFuncReturn("browser_StorageGet", func(arg ...string) string {
		return storage.Get(arg[0])
	})

	browser.BindFuncVoid("browser_Terminate", func(_ ...string) {
		storage.Clear()
		browser.Close()
	})

	browser.Open()
}
