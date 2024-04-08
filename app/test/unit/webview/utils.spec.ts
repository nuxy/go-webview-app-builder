// Load modules
import * as utils from '../../../src/webview/utils';

describe('Utils module', function() {
  describe('Functions', function() {
    describe('openExtBrowser', function() {
      test('should call function', async function() {
        window['browser_OpenExtBrowser'] = jest.fn();

        jest.spyOn(utils, 'webViewBindExists')
          .mockImplementation(() => true);

        const method = jest.spyOn(window, 'browser_OpenExtBrowser');

        utils.openExtBrowser('https://domain.com/api');

        expect(method).toHaveBeenCalled();
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
