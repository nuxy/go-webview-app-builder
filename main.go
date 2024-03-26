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
	jsModules := lib.ReadFile("app/dist/main.bundle.js")
	jsModules = strings.TrimSpace(jsModules)

	vars := lib.TmplVars{
		Title: "WebView App",
		JS: lib.EncodeData(jsModules, "text/javascript"),
	}

	markup := lib.ReadHtml("app/index.tmpl", vars)

	w := webview.New(false)
	defer w.Destroy()
	w.SetTitle(vars.Title)
	w.SetSize(480, 320, webview.HintNone)
	w.SetHtml(markup)
	w.Run()
}
