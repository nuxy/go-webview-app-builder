export {};

/**
 * Go WebView bindings (e.g. global functions).
 */
declare global {
  interface Window {
    browser_Navigate: any;
    browser_StorageDelete: any;
    browser_StorageGet: any;
    browser_StorageSet: any;
    browser_Terminate: any;
  }
}
