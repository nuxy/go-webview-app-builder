import {IRouteableComponent, IRoute} from '@aurelia/router';

// Local modules.
import {Home}  from './screens/home';
import {News}  from './screens/news';
import {About} from './screens/about';

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
}
