package lib

import (
	"encoding/base64"
	"strings"
)

/**
 * Generate Base64 string from data.
 */
func EncodeData(v string, mimeType string) string {
	if mimeType == "" {
		mimeType = "text/html"
	}

	builder := &strings.Builder{}

	encoder := base64.NewEncoder(base64.StdEncoding, builder)
	encoder.Write([]byte(v))
	encoder.Close()

	return "data:" + mimeType + ";base64," + builder.String()
}
