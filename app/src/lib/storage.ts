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
 * Provides methods for storing data.
 */
export class Storage {

  /**
   * Return values for a given key.
   *
   * @param {String} key
   *   Storage key name.
   *
   * @example
   *   const data = Storage.get('foo');
   *
   * @return {*|void}
   */
  static get(key: string): any | void {
    if (webViewBindExists('browser_StorageGet')) {
      if (typeof key === 'string') {
        const value = window.browser_StorageGet(key);

        if (value && Storage.isValidJson(value)) {
          return JSON.parse(value);
        }
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
   * @example
   *   Storage.set('foo', {bar: 'baz'});
   *
   * @return {void}
   */
  static set(key: string, value: any): void {
    if (webViewBindExists('browser_StorageSet')) {
      if (typeof key === 'string') {
        value = JSON.stringify(value);

        window.browser_StorageGet(key, value);
      }
    }
  }

  /**
   * Remove values for a given key.
   *
   * @param {String} key
   *   Storage item key name.
   *
   * @example
   *   Storage.remove('foo');
   *
   * @return {void}
   */
  static remove(key: string): void {
    if (webViewBindExists('browser_StorageDelete')) {
      if (typeof key === 'string') {
        window.browser_StorageDelete(key);
      }
    }
  }

  /**
   * Check string is valid JSON format.
   *
   * @param {String} str
   *   JSON as string.
   *
   * @example
   *   const result = Storage.isValidJson({
   *     "foo": "bar",
   *     "baz": "qux"
   *   });
   *
   * @return {Boolean|void}
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
