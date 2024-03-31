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
	"strconv"
)

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
