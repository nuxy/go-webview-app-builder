export {};

/**
 * Go WebView bindings (e.g. global functions).
 */
declare global {
  interface Window {
    webview_Navigate:  any;
    webview_Terminate: any;
  }
}
