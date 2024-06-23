// Load modules
import {AppRequest, AppResponse} from '../../../src/webview/http';
import * as utils                from '../../../src/webview/utils';

describe('AppRequest module', function() {
  describe('Instance methods', function() {
    const url = 'https://domain.com/api';

    afterEach(function() {
      jest.restoreAllMocks();
    });

    describe('get', function() {
      const status  = 200;
      const headers = {'Content-Type': 'text/html'};
      const body    = '{"foo":"bar"}';

      describe('binding', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          window['browser_HttpGet'] = () => mockAppResponse({
            Status: status,
            Headers: headers,
            Body: body
          });

          mockFetchResponse({status, headers, body});

          const request = new AppRequest();
          const result: AppResponse = await request.get(url);

          expect(result).toEqual({Status: status, Headers: headers, Body: body});
        });
      });

      describe('fallback', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          mockFetchResponse({status, headers: new Map(Object.entries(headers)), body});

          const request = new AppRequest();
          const result: AppResponse = await request.get(url);

          expect(result).toEqual({Status: status, Headers: headers, Body: body});
        });
      });
    });

    describe('head', function() {
      const status  = 200;
      const headers = {'Last-Modified': 'Fri, 6 Jul 1973 00:00:00 GMT'};
      const body    = '';

      describe('binding', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          window['browser_HttpHead'] = () => mockAppResponse({
            Status: status,
            Headers: headers,
            Body: body
          });

          mockFetchResponse({status, headers, body});

          const request = new AppRequest();
          const result: AppResponse = await request.head(url);

          expect(result).toEqual({Status: status, Headers: headers, Body: ''});
        });
      });

      describe('fallback', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          mockFetchResponse({status, headers: new Map(Object.entries(headers)), body});

          const request = new AppRequest();
          const result: AppResponse = await request.head(url);

          expect(result).toEqual({Status: status, Headers: headers, Body: ''});
        });
      });
    });

    describe('post', function() {
      const status  = 201;
      const headers = {'Content-Type': 'text/html'};
      const body    = '{"foo":"bar"}';

      describe('binding', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          window['browser_HttpPost'] = () => mockAppResponse({
            Status: status,
            Headers: headers,
            Body: body
          });

          mockFetchResponse({status, headers, body});

          const request = new AppRequest();
          const result: AppResponse = await request.post(url);

          expect(result).toEqual({Status: status, Headers: headers, Body: body});
        });
      });

      describe('fallback', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          mockFetchResponse({status, headers: new Map(Object.entries(headers)), body});

          const request = new AppRequest();
          const result: AppResponse = await request.post(url);

          expect(result).toEqual({Status: status, Headers: headers, Body: body});
        });
      });
    });
  });
});

/**
 * Mock Go application response with custom data.
 */
function mockAppResponse(data: AppResponse): Promise<string> {
  return Promise.resolve(JSON.stringify(data));
}

/**
 * Mock Fetch API method with custom response data.
 */
function mockFetchResponse({status, headers, body}): void {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({status, headers, text: () => body})
  );
}
