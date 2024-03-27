export {};

/**
 * Go WebView bindings (e.g. global functions).
 */
declare global {
  interface Window {
    webview_LoadModel: any;
    webview_Terminate: any;
  }
}
