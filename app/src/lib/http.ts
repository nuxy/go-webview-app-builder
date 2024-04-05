/**
 *  go-webview-app-builder
 *  Create a Aurelia JavaScript application in a WebView
 *
 *  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

// Local modules.
import {webViewBindExists} from './utils';

export type RequestBody = {
  [T: string]: string
}

export type RequestHeaders = {
  [T: string]: string
}

export type Response = {
  Status: number,
  Headers: RequestHeaders,
  Body: string
}

/**
 * Provides HTTP client methods (Go WebView bindings and SPA fallback).
 */
export class Request {

  /**
   * Make HTTP GET request to a remote source.
   *
   * @param {String} url
   *   Request URL/URI location.
   *
   * @example
   *   const response: Response = await Request.get('https://domain.com/index.html');
   *
   * @return {Promise<Response>}
   */
  async get(url: string): Promise<Response> {
    return (webViewBindExists('browser_HttpGet'))
      ? this.normalize(await window.browser_HttpGet(url))
      : this.send('GET', url);
  }

  /**
   * Make HTTP HEAD request to a remote source.
   *
   * @param {String} url
   *   Request URL/URI location.
   *
   * @example
   *   const response: Response = await Request.head('https://domain.com/index.html');
   *
   * @return {Promise<Response>}
   */
  async head(url: string): Promise<Response> {
    return (webViewBindExists('browser_HttpHead'))
      ? this.normalize(await window.browser_HttpHead(url))
      : this.send('HEAD', url);
  }

  /**
   * Make HTTP POST request to a remote source.
   *
   * @param {String} url
   *   Request URL/URI location.
   *
   * @param {Object|undefined} headers
   *   Request HTTP headers (optional).
   *
   * @param {String|Object|undefined} body
   *   Request body (optional).
   *
   * @example
   *   const response: Response = await Request.post(
   *     'https://domain.com/index.html',
   *     {
   *       'Accept': 'text/html',
   *       'Content-Type': 'application/json',
   *
   *         ..
   *     },
   *     {
   *       name1: 'value1',
   *       name2: 'value2',
   *
   *         ..
   *     }
   *   );
   *
   * @return {Promise<Response>}
   */
  async post(url: string, headers: RequestHeaders = {}, body?: RequestBody | string): Promise<Response> {
    if (webViewBindExists('browser_HttpPost')) {

      // Convert data to Go bindings supported string types (e.g. JSON).
      const _headers = JSON.stringify(headers);
      const _body = (typeof body !== 'string') ? JSON.stringify(body) : body;

      return this.normalize(await window.browser_HttpPost(url, _headers, _body));
    } else {
      return this.send('POST', url, headers, body);
    }
  }

  /**
   * Make HTTP request to a remote source (SPA fallback only).
   *
   * @param {String} method
   *   Request method (GET|HEAD|POST).
   *
   * @param {String} url
   *   Request URL/URI location.
   *
   * @param {Object|undefined} headers
   *   Request HTTP headers (optional).
   *
   * @param {String|Object|undefined} body
   *   Request body (optional).
   *
   * @return {Promise<Response>}
   */
  send(method: string, url: string, headers: RequestHeaders = {}, body?: RequestBody | string): Promise<Response> {
    let data: FormData | string;

    if (method === 'POST' && typeof body === 'object') {
      const formData = new FormData();

      for (let key in body) {
        formData.append(key, body[key]);
      }

      data = formData;

      headers = Object.assign({
        'Content-Type': 'multipart/form-data'
      }, headers);
    }

    return fetch(url, {
        method,
        body: data,
        credentials: 'include',
        headers
      })

      // Process response.
      .then(async response => {

        // .. conform to Go WebView binding format.
        return {
          Status: response.status,
          Headers: Object.fromEntries(response.headers),
          Body: await response.text()
        };
      });
  }

  /**
   * Ensure Go WebView bindings and development response match.
   *
   * @param {String} json
   *   JSON string (Request encoded).
   *
   * @return {Response}
   */
  private normalize(json): Response {
    return JSON.parse(json);
  }
}
