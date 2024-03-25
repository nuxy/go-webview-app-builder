package lib

import (
	"log"
	"path/filepath"
	"strings"
	"text/template"
)

//
// Template declared data types.
//
type TmplVars struct {
	Title string
	CSS string
}

/**
 * Parse template, return HTML document.
 */
func ReadHtml(path string, vars TmplVars) string {
	tmpl, err := template.New(filepath.Base(path)).ParseFiles(path)

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
