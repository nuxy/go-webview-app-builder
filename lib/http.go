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
	"bytes"
	"io"
	"encoding/json"
	"log"
	"net/http"
	"net/url"
)

//
// Request declared data types.
//
type Response struct {
	Status  int
	Headers http.Header
	Body    string
}

type Request struct {
	data Response
}

//
// NewRequest creates a HTTP client instance.
//
func NewRequest() *Request {
	request := &Request{}
	return request
}

//
// Make HTTP GET request to a remote source.
//
func (request *Request) Get(URL string) *Request {
	validateURL(URL)

	resp, err := http.Get(URL)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(io.Reader(resp.Body))

	if err != nil {
		log.Fatal(err)
	}

	request.data = Response {
		Status:  resp.StatusCode,
		Headers: resp.Header,
		Body:    string(body),
	}

	return request
}

//
// Make HTTP Head request to a remote source.
//
func (request *Request) Head(URL string) *Request {
	validateURL(URL)

	resp, err := http.Head(URL)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	request.data = Response {
		Status:  resp.StatusCode,
		Headers: resp.Header,
		Body:    "",
	}

	return request
}

//
// Make HTTP POST request to a remote source.
//
func (request *Request) Post(URL string, headers string, body string) *Request {
	validateURL(URL)

	buffer := bytes.NewBuffer([]byte(body))

	req, err := http.NewRequest("POST", URL, buffer)

	if err != nil {
		log.Fatal(err)
	}

	// Add HTTP headers from JSON
	for k, v := range parseJSON(headers) {
		req.Header.Set(k, v.(string))
	}

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	_body, err := io.ReadAll(io.Reader(resp.Body))

	if err != nil {
		log.Fatal(err)
	}

	request.data = Response {
		Status:  resp.StatusCode,
		Headers: resp.Header,
		Body:    string(_body),
	}

	return request
}

//
// Returns unmashaled Request response.
//
func (request *Request) Response() Response {
	return request.data
}

//
// Returns Request response as JSON.
//
func (request *Request) JsonResponse() string {
	b, err := json.Marshal(request.data)

	if err != nil {
		log.Fatal(err)
	}

	return string(b)
}

//
// Converts a dynamic JSON string to a map.
//
func parseJSON(rawJSON string) map[string]interface{} {
	var data interface{}

	err := json.Unmarshal([]byte(rawJSON), &data)

	if err != nil {
		log.Fatal(err)
	}

	return data.(map[string]interface{})
}

//
// Checks for a valid URL structure, fail otherwise.
//
func validateURL(rawURL string) {
	_, err := url.ParseRequestURI(rawURL)

	if err != nil {
		log.Fatal("Invalid URL: ", err)
	}
}
