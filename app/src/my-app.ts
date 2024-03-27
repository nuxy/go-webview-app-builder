import {IRouteableComponent, IRoute} from '@aurelia/router';

// Local modules.
import {Home}  from './screens/home';
import {News}  from './screens/news';
import {About} from './screens/about';

import {webViewBindExists} from './lib/utils';

export class MyApp implements IRouteableComponent {
  static routes: IRoute[] = [
    {
      path: [''],
      component: Home,
      title: 'Home'
    },
    {
      path: ['/news'],
      component: News,
      title: 'News'
    },
    {
      path: ['/about'],
      component: About,
      title: 'About'
    }
  ];

  /**
   * WebView binding to terminate Go app.
   */
  public exit(): void {
    webViewBindExists('webview_Terminate') && window.webview_Terminate();
  }
}
