// Local modules.
import {webViewBindExists} from '../lib/utils';

export class News {
  public title = 'News screen';

  /**
   * @inheritdoc
   */
  binding() {
    webViewBindExists('webview_LoadModel') && window.webview_LoadModel('News');
  }
}
