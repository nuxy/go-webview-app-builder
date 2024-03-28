//
//  go-webview-app-builder
//  Create a Aurelia JavaScript application in a WebView
//
//  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
//  Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

package lib

import (
	"log"
	"strings"

	webview "github.com/webview/webview_go"
)

// Browser WebView properties.
const (
	windowTitle  string = "WebView App"
	windowHeight int    = 320
	windowWidth  int    = 480
	devTools     bool   = false
)

//
// Browser declared data types.
//
type Browser struct {
	WebView  webview.WebView
	document string
	debug    bool
}

type BrowserFuncVoid   func(arg ...string)
type BrowserFuncReturn func(arg ...string) string

//
// NewBrowser creates a WebView instance.
//
func NewBrowser(htmlMarkup string) *Browser {
	browser := &Browser{}
	browser.document = htmlMarkup
	browser.init()
	return browser
}

//
// Initialize a new WebView window.
//
func (browser *Browser) init() {
	browser.WebView = webview.New(browser.debug)
	browser.WebView.SetTitle(windowTitle)
	browser.WebView.SetSize(windowWidth, windowHeight, webview.HintNone)
	browser.WebView.SetHtml(browser.document)
}

//
// Launch the WebView window.
//
func (browser *Browser) Debug(v bool) {
	browser.debug = v || devTools
}

//
// Launch the WebView window.
//
func (browser *Browser) Open() {
	browser.WebView.Run()
}

//
// Close the WebView window.
//
func (browser *Browser) Close() {
	browser.WebView.Terminate()
}

//
// Bind JavaScript function to DOM Window (no return, void).
//
func (browser *Browser) BindFuncVoid(funcName string, callback BrowserFuncVoid) {
	c := func(arg ...string) {
		browser.logEvent(funcName, strings.Join(arg, ", "))

		callback(arg...)
	}

	browser.WebView.Bind(funcName, c)
}

//
// Bind JavaScript function to DOM Window (return string).
//
func (browser *Browser) BindFuncReturn(funcName string, callback BrowserFuncReturn) {
	c := func(arg ...string) string {
		browser.logEvent(funcName, strings.Join(arg, ", "))

		return callback(arg...)
	}

	browser.WebView.Bind(funcName, c)
}

//
// Output event to standard logger.
//
func (browser *Browser) logEvent(arg ...string) {
	if (browser.debug) {
		if len(arg) > 1 && len(arg[1]) > 1 {
			log.Printf("Function '%s' called with '%s'", arg[0], arg[1])
		} else {
			log.Printf("Function '%s' called with no arguments", arg[0])
		}
	}
}
