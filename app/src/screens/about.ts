// Local modules.
import {webViewBindExists} from '../lib/utils';

export class About {
  public title = 'About';

  /**
   * @inheritdoc
   */
  binding() {
    webViewBindExists('webview_LoadModel') && window.webview_LoadModel('about');
  }
}
