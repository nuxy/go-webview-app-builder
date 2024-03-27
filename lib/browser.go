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

	webview "github.com/webview/webview_go"
)

// Browser WebView properties.
const (
	windowTitle  string = "WebView App"
	windowHeight int    = 320
	windowWidth  int    = 480
	devTools     bool   = false;
)

//
// Browser declared data types.
//
type Browser struct {
	WebView  webview.WebView
	document string
	debug    bool
}

type BrowserCallback func(payload string)

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
// Expose JavaScript function in Window.
//
func (browser *Browser) Bind(funcName string, callback BrowserCallback) {
	c := func(args ...string) {
		if len(args) == 1 {
			if (browser.debug) {
				log.Printf("Function '%s' called with: %s", funcName, args[0])
			}

			callback(args[0])
		} else {
			if (browser.debug) {
				log.Printf("Function '%s' called with no arguments", funcName)
			}

			callback("")
		}
	}

	browser.WebView.Bind(funcName, c)
}
