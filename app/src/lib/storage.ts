/**
 *  go-webview-app-builder
 *  Create a Aurelia JavaScript application in a WebView
 *
 *  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

// Local modules.
import {webViewBindExists} from './utils';

/**
 * Provides methods for storing data (Go WebView bindings and SPA fallback).
 */
export class Storage {

  /**
   * Return values for a given key.
   *
   * @param {String} key
   *   Storage key name.
   *
   * @return {*|void}
   *
   * @example
   *   const data = Storage.get('foo');
   */
  static get(key: string): any | void {
    if (typeof key === 'string') {
      const value = (webViewBindExists('browser_StorageGet'))
        ? window.browser_StorageGet(key)
        : sessionStorage.getItem(key);

      if (value && Storage.isValidJson(value)) {
        return JSON.parse(value);
      }
    }
  }

  /**
   * Store values for a given key.
   *
   * @param {String} key
   *   Storage item key name.
   *
   * @param {*} value
   *   storageType value.
   *
   * @return {void}
   *
   * @example
   *   Storage.set('foo', {bar: 'baz'});
   */
  static set(key: string, value: any): void {
    if (typeof key === 'string') {
      value = JSON.stringify(value);

      (webViewBindExists('browser_StorageSet'))
        ? window.browser_StorageSet(key, value)
        : sessionStorage.setItem(key, value);
    }
  }

  /**
   * Remove values for a given key.
   *
   * @param {String} key
   *   Storage item key name.
   *
   * @return {void}
   *
   * @example
   *   Storage.remove('foo');
   */
  static remove(key: string): void {
    if (typeof key === 'string') {
      (webViewBindExists('browser_StorageDelete'))
        ? window.browser_StorageDelete(key)
        : sessionStorage.removeItem(key);
    }
  }

  /**
   * Check string is valid JSON format.
   *
   * @param {String} str
   *   JSON as string.
   *
   * @return {Boolean|void}
   *
   * @example
   *   const result = Storage.isValidJson({
   *     "foo": "bar",
   *     "baz": "qux"
   *   });
   */
  static isValidJson(str: string): boolean | void {
    if (typeof str === 'string') {
      try {
        JSON.parse(str);
      } catch (err) {
        return false;
      }

      return true;
    }
  }
}
