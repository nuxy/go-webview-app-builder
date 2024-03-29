export {};

/**
 * Go WebView bindings (e.g. global functions).
 */
declare global {
  interface Window {
    browser_AppVersion?: () => string;
    browser_Navigate?: (routeId: string) => void;
    browser_StorageDelete?: (key: string) => void;
    browser_StorageGet?: (key: string) => string;
    browser_StorageSet?: (key: string, value: string) => void;
    browser_Terminate?: () => void;
  }
}
