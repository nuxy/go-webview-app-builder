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
