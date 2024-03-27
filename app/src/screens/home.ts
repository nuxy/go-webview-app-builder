// Local modules.
import {webViewBindExists} from '../lib/utils';

export class Home {
  public title = 'Home';

  /**
   * @inheritdoc
   */
  binding() {
    webViewBindExists('webview_LoadModel') && window.webview_LoadModel('home');
  }
}
