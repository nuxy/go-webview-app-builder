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
  created() {
    let version = require('../package.json').version;

    if (webViewBindExists('browser_AppVersion')) {
      version = window.browser_AppVersion();
    }

    // Output to console.
    console.info(`Version: ${version}`);
  }

  bound() {
    this.ea.subscribe('au:router:navigation-start', ({navigation}) => {
      webViewBindExists('browser_Navigate') && window.browser_Navigate(navigation?.instruction);
    });
  }

  attached() {
    if (process.env.debug !== 'true') {

      // Globally disable (right-click) context menus.
      window.oncontextmenu = event => event.preventDefault();
    }
  }

  /**
   * WebView binding to terminate Go app.
   */
  public exit(): void {
    webViewBindExists('browser_Terminate') && window.browser_Terminate();
  }
}
