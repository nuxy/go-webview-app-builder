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
	"encoding/base64"
	"log"
	"strings"
	"text/template"
)

//
// Generate HTML document, returns markup as string.
//
func GenHtmlMarkup(appBundle string, indexTmpl string) string {
	appBundle = strings.TrimSpace(appBundle)

	tmpl, err := template.New("data").Parse(indexTmpl)

	if err != nil {
		log.Fatal("Cannot parse ", err)
	}

	vars := struct {
		JS string
	}{
		JS: encodeData(appBundle, "text/javascript"),
	}

	builder := &strings.Builder{}

	err = tmpl.Execute(builder, vars)

	if err != nil {
		log.Fatal("Cannot execute ", err)
	}

	return builder.String()
}

//
// Generate browser HTTP Data URL (HTTP data:)
//
func encodeData(v string, mimeType string) string {
	if mimeType == "" {
		mimeType = "text/html"
	}

	builder := &strings.Builder{}

	encoder := base64.NewEncoder(base64.StdEncoding, builder)
	encoder.Write([]byte(v))
	encoder.Close()

	return "data:" + mimeType + ";base64," + builder.String()
}
