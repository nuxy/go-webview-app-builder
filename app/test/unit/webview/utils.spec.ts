// Load modules
import * as utils from '../../../src/webview/utils';

describe('Utils module', function() {
  describe('Functions', function() {
    afterEach(function() {
      jest.restoreAllMocks();
    });

    describe('openExtBrowser', function() {
      describe('binding', function() {
        test('should call function', async function() {
          window['browser_OpenExtBrowser'] = jest.fn();

          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          const method = jest.spyOn(window, 'browser_OpenExtBrowser');

          utils.openExtBrowser('https://domain.com/api');

          expect(method).toHaveBeenCalled();
        });
      });

      describe('fallback', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          jest.spyOn(window, 'window', 'get')
            .mockImplementation(() => ({ // @ts-ignore
              location: {
                href: 'https://domain.com/api'
              }
            }));

          utils.openExtBrowser('https://domain.com/api');

          expect(window.location.href).toEqual('https://domain.com/api');
        });
      });
    });

    describe('webViewBindExists', function() {
      test('should return boolean', async function() {
        window['browser_BindName'] = jest.fn();

        const result = utils.webViewBindExists('browser_BindName');

        expect(result).toBe(true);
      });
    });
  });
});
