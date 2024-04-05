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
	"strconv"

	"github.com/pkg/browser"
)

//
// Opens URL in the OS default web browser.
//
func OpenExtBrowser(url string) {
	browser.OpenURL(url)
}

//
// Converts a valid string value to boolean.
//
func StrToBool(v string) bool {
	_v, err := strconv.ParseBool(v)

	if err != nil {
		log.Fatal(err)
	}

	return _v
}
