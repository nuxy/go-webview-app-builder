/**
 * Check Go defined WebView function binding exists.
 *
 * @param name
 *   Name of Go binding.
 *
 * @return {Boolean}
 *
 * @example
 *   const result = webViewBindExists('browser_<Binding>');
 *   // true
 */
export function webViewBindExists(name: string | undefined): boolean {
  return name && /^browser_/.test(name) && typeof window[name] === 'function';
}
