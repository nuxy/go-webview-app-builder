/**
 *  go-webview-app-builder
 *  Create a Aurelia JavaScript application in a WebView
 *
 *  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

export {};

/**
 * Go WebView bindings (e.g. global functions).
 */
declare global {
  interface Window {
    browser_AppVersion?: () => Promise<string>;
    browser_HttpGet?: (url: string) => Promise<any>;
    browser_HttpHead?: (url: string) => Promise<any>;
    browser_HttpPost?: (url: string, headers: string, body: string) => Promise<any>;
    browser_Navigate?: (routeId: string) => Promise<void>;
    browser_OpenExtBrowser?: (url: string) => Promise<void>;
    browser_StorageDelete?: (key: string) => Promise<void>;
    browser_StorageGet?: (key: string) => Promise<any>;
    browser_StorageSet?: (key: string, value: any) => Promise<void>;
    browser_Terminate?: () => Promise<void>;
  }
}
