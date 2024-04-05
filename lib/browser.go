//
//  go-webview-app-builder
//  Create a JavaScript single-page application (SPA) in a WebView
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

//
// Browser declared data types.
//
type BrowserSettings struct {
	Title  string
	Height int
	Width  int
	Resize bool
	Debug  bool
}

type Browser struct {
	WebView  webview.WebView
	document string
	settings BrowserSettings
}

type BrowserFuncVoid   func(arg ...string)
type BrowserFuncReturn func(arg ...string) string

//
// NewBrowser creates a WebView instance.
//
func NewBrowser(htmlMarkup string, settings BrowserSettings) *Browser {
	browser := &Browser{settings: settings}
	browser.document = htmlMarkup
	browser.init()
	return browser
}

//
// Initialize a new WebView window.
//
func (browser *Browser) init() {
	var webviewHint webview.Hint = webview.HintFixed

	if browser.settings.Resize {
		webviewHint = webview.HintNone
	}

	browser.WebView = webview.New(browser.settings.Debug)
	browser.WebView.SetTitle(browser.settings.Title)
	browser.WebView.SetSize(browser.settings.Width, browser.settings.Height, webviewHint)
	browser.WebView.SetHtml(browser.document)
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
	if (browser.settings.Debug) {
		if len(arg) > 1 && len(arg[1]) > 1 {
			log.Printf("Function '%s' called with '%s'", arg[0], arg[1])
		} else {
			log.Printf("Function '%s' called with no arguments", arg[0])
		}
	}
}
