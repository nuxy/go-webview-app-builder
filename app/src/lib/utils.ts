/**
 * Check Go defined WebView function binding exists.
 *
 * @param name
 *   Name of Go binding.
 *
 * @return {Boolean}
 */
export function webViewBindExists(name: string | undefined): boolean {
  return name && typeof window[name] === 'function';
}
