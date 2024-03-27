// Local modules.
import {webViewBindExists} from '../lib/utils';

export class Home {
  public title = 'Home screen';

  /**
   * @inheritdoc
   */
  binding() {
    webViewBindExists('webview_LoadModel') && window.webview_LoadModel('Home');
  }
}
