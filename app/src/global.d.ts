export {};

/**
 * Go WebView bindings (e.g. global functions).
 */
declare global {
  interface Window {
    browser_Navigate:  any;
    browser_Terminate: any;
  }
}
