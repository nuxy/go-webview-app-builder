// Load modules
import {AppStorage, StorageData} from '../../../src/webview/storage';
import * as utils                from '../../../src/webview/utils';

describe('AppStorage module', function() {
  describe('Static methods', function() {
    afterEach(function() {
      jest.restoreAllMocks();
    });

    describe('get', function() {
      const data = {foo: 'bar'};

      describe('binding', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          window['browser_StorageGet'] = () => mockAppData(data);

          const result: StorageData = await AppStorage.get('foo');

          expect(result).toEqual(data);
        });
      });

      describe('fallback', function() {
        test('should return object', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          jest.spyOn(Storage.prototype, 'getItem')
            .mockImplementation(() => mockStorageData(data));

          const result: StorageData = await AppStorage.get('foo');

          expect(result).toEqual(data);
        });
      });
    });

    describe('set', function() {
      const data = {foo: 'bar'};

      describe('binding', function() {
        test('should call function', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          window['browser_StorageSet'] = jest.fn();

          const method = jest.spyOn(window, 'browser_StorageSet');

          await AppStorage.set('foo', data);

          expect(method).toHaveBeenCalled();
        });
      });

      describe('fallback', function() {
        test('should call function', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          const method = jest.spyOn(Storage.prototype, 'setItem');

          await AppStorage.set('foo', data);

          expect(method).toHaveBeenCalled();
        });
      });
    });

    describe('remove', function() {
      describe('binding', function() {
        test('should call function', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => true);

          window['browser_StorageDelete'] = jest.fn();

          const method = jest.spyOn(window, 'browser_StorageDelete');

          await AppStorage.remove('foo');

          expect(method).toHaveBeenCalled();
        });
      });

      describe('fallback', function() {
        test('should call function', async function() {
          jest.spyOn(utils, 'webViewBindExists')
            .mockImplementation(() => false);

          const method = jest.spyOn(Storage.prototype, 'removeItem');

          await AppStorage.remove('foo');

          expect(method).toHaveBeenCalled();
        });
      });
    });
  });
});

/**
 * Mock Go application response with custom data.
 */
function mockAppData(data: StorageData): Promise<string> {
  return Promise.resolve(JSON.stringify(data));
}

/**
 * Mock window.sessionStorage with custom data.
 */
function mockStorageData(data: StorageData): string {
  return JSON.stringify(data);
}
