import {IEventAggregator}            from 'aurelia';
import {IRouteableComponent, IRoute} from '@aurelia/router';

// Local modules.
import {About}    from './screens/about';
import {Game}     from './screens/game';
import {Projects} from './screens/projects';

import {webViewBindExists} from './lib/utils';

export class MyApp implements IRouteableComponent {
  static routes: IRoute[] = [
    {
      id: 'about',
      path: ['', 'about'],
      component: About,
      title: 'About'
    },
    {
      id: 'game',
      path: ['game'],
      component: Game,
      title: 'Game'
    },
    {
      id: 'projects',
      path: ['projects'],
      component: Projects,
      title: 'Projects'
    }
  ];

  /**
   * @inheritdoc
   */
  constructor(@IEventAggregator readonly ea: IEventAggregator) {}

  /**
   * @inheritdoc
   */
  async created() {
    let version = require('../package.json').version;

    if (webViewBindExists('browser_AppVersion')) {
      version = await window.browser_AppVersion();
    }

    // Output to console.
    console.info(`Version: ${version}`);
  }

  bound() {
    this.ea.subscribe('au:router:navigation-start', async ({navigation}) => {
      webViewBindExists('browser_Navigate') && await window.browser_Navigate(navigation?.instruction);
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
  public async exit(): Promise<void> {
    webViewBindExists('browser_Terminate') && await window.browser_Terminate();
  }
}
