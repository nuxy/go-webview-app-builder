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

export type StorageData = {
  [T: string]: string
}

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
   *   const data: StorageData = await Storage.get('foo');
   */
  static async get(key: string): Promise<any> {
    if (typeof key === 'string') {
      const value = (webViewBindExists('browser_StorageGet'))
        ? await window.browser_StorageGet(key)
        : await sessionStorage.getItem(key);

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
   *   await Storage.set('foo', {bar: 'baz'}: StorageData);
   */
  static async set(key: string, value: any): Promise<void> {
    if (typeof key === 'string') {
      value = JSON.stringify(value);

      (webViewBindExists('browser_StorageSet'))
        ? await window.browser_StorageSet(key, value)
        : await sessionStorage.setItem(key, value);
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
   *   await Storage.remove('foo');
   */
  static async remove(key: string): Promise<void> {
    if (typeof key === 'string') {
      (webViewBindExists('browser_StorageDelete'))
        ? await window.browser_StorageDelete(key)
        : await sessionStorage.removeItem(key);
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
