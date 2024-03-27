package lib

import (
	"time"

	cache "github.com/patrickmn/go-cache"
)

//
// Storage declared data types.
//
type Storage struct {
	cache *cache.Cache
}

//
// NewStorage creates a storage instance.
//
func NewStorage() *Storage {
	storage := &Storage{}
	storage.init()
	return storage
}

//
// Initializes in-memory cache.
//
func (storage *Storage) init() {
	storage.cache = cache.New(10*time.Minute, 60*time.Minute)
}

//
// Clear all items from storage.
//
func (storage *Storage) Clear() {
	storage.cache.Flush()
}

//
// Get value from storage by key.
//
func (storage *Storage) Get(k string) string {
	var v string

	if _v, found := storage.cache.Get(k); found {
		v = _v.(string)
	}

	return v
}

//
// Set the key/value in storage.
//
func (storage *Storage) Set(k string, v string) {
	storage.cache.Set(k, v, cache.NoExpiration)
}
