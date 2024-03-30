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
    browser_StorageDelete?: (key: string) => Promise<void>;
    browser_StorageGet?: (key: string) => Promise<string>;
    browser_StorageSet?: (key: string, value: string) => Promise<void>;
    browser_Terminate?: () => Promise<void>;
  }
}
