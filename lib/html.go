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
	"text/template"
)

//
// Template declared data types.
//
type TmplVars struct {
	Title string
	CSS   string
	JS    string
}

//
// Parse template, return HTML document.
//
func ReadHtml(data string, vars TmplVars) string {
	tmpl, err := template.New("data").Parse(data)

	if err != nil {
		log.Fatal("Cannot parse ", err)
	}

	builder := &strings.Builder{}

	err = tmpl.Execute(builder, vars)

	if err != nil {
		log.Fatal("Cannot execute ", err)
	}

	return builder.String()
}
