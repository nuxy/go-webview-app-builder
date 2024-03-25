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

	vars := lib.TmplVars{
		CSS: cssRules,
    }

	markup := lib.ReadHtml("app/main.tmpl", vars)

	w := webview.New(false)
	defer w.Destroy()
	w.SetTitle("WebView App")
	w.SetSize(480, 320, webview.HintNone)
	w.SetHtml(markup)
	w.Run()
}
