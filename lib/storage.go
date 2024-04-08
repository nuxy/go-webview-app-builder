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
	"time"

	cache "github.com/patrickmn/go-cache"
)

// Storage declared data types.
type Storage struct {
	cache *cache.Cache
}

// NewStorage creates a storage instance.
func NewStorage() *Storage {
	storage := &Storage{}
	storage.init()
	return storage
}

// Initializes in-memory cache.
func (storage *Storage) init() {
	storage.cache = cache.New(10*time.Minute, 60*time.Minute)
}

// Clear all items from storage.
func (storage *Storage) Clear() {
	storage.cache.Flush()
}

// Delete value from storage by key.
func (storage *Storage) Delete(k string) {
	storage.cache.Delete(k)
}

// Get value from storage by key.
func (storage *Storage) Get(k string) string {
	var v string

	if _v, found := storage.cache.Get(k); found {
		v = _v.(string)
	}

	return v
}

// Set the key/value in storage.
func (storage *Storage) Set(k string, v string) {
	storage.cache.Set(k, v, cache.NoExpiration)
}
