package main

import (
	"strings"

	webview "github.com/webview/webview_go"

	"github.com/nuxy/go-webview-app-builder/lib"
)

//
// Let's get this party started.
//
func main() {
	cssRules := lib.ReadFile("app/dist/app.css")
	cssRules = strings.TrimSpace(cssRules)

	jsModules := lib.ReadFile("app/dist/app.js")
	jsModules = strings.TrimSpace(jsModules)

	vars := lib.TmplVars{
		Title: "WebView App",
		CSS: lib.EncodeData(cssRules, "text/css"),
		JS: lib.EncodeData(jsModules, "text/javascript"),
	}

	markup := lib.ReadHtml("app/main.tmpl", vars)

	w := webview.New(false)
	defer w.Destroy()
	w.SetTitle(vars.Title)
	w.SetSize(480, 320, webview.HintNone)
	w.SetHtml(markup)
	w.Run()
}
