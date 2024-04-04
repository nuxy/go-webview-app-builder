import Aurelia               from 'aurelia';
import {RouterConfiguration} from '@aurelia/router';
import {MyApp}               from './my-app';
import * as slotMachineElm   from './resources/elements/slot-machine';

Aurelia
  .register(
    RouterConfiguration.customize({useUrlFragmentHash: true}),
    slotMachineElm
  )
  .app(MyApp)
  .start();
