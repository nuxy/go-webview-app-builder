/**
 *  go-webview-app-builder
 *  Create a Aurelia JavaScript application in a WebView
 *
 *  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Check Go defined WebView function binding exists.
 *
 * @param {String} name
 *   Name of Go binding.
 *
 * @return {Boolean}
 *
 * @example
 *   const result: boolean = webViewBindExists('browser_<Binding>');
 *   // true
 */
export function webViewBindExists(name: string): boolean {
  return name && /^browser_/.test(name) && typeof window[name] === 'function';
}
