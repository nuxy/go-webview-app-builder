import Aurelia               from 'aurelia';
import {RouterConfiguration} from '@aurelia/router';
import {MyApp}               from './my-app';

Aurelia
  .register(RouterConfiguration.customize({useUrlFragmentHash: true}))
  .app(MyApp)
  .start();
