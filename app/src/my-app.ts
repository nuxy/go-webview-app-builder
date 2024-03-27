import {IEventAggregator}            from 'aurelia';
import {IRouteableComponent, IRoute} from '@aurelia/router';

// Local modules.
import {Home}  from './screens/home';
import {News}  from './screens/news';
import {About} from './screens/about';

import {webViewBindExists} from './lib/utils';

export class MyApp implements IRouteableComponent {
  static routes: IRoute[] = [
    {
      id: 'home',
      path: ['', 'home'],
      component: Home,
      title: 'Home'
    },
    {
      id: 'news',
      path: ['news'],
      component: News,
      title: 'News'
    },
    {
      id: 'about',
      path: ['about'],
      component: About,
      title: 'About'
    }
  ];

  /**
   * @inheritdoc
   */
  constructor(@IEventAggregator readonly ea: IEventAggregator) {}

  /**
   * @inheritdoc
   */
  bound() {
    this.ea.subscribe('au:router:navigation-start', ({navigation}) => {
      webViewBindExists('webview_Navigate') && window.webview_Navigate(navigation?.instruction);
    });
  }

  /**
   * WebView binding to terminate Go app.
   */
  public exit(): void {
    webViewBindExists('webview_Terminate') && window.webview_Terminate();
  }
}
