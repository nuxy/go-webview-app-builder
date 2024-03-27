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
	"io/ioutil"
	"log"
)

//
// Return file contents as string.
//
func ReadFile(path string) string {
	content, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal("Cannot open ", err)
	}

	return string(content)
}
