/**
 *  Slot Machine
 *  Create an extremely biased, web-based slot machine game.
 *
 *  Copyright 2024, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

import {bindable} from 'aurelia';

import {
  customElement,
  ICustomElementViewModel
} from '@aurelia/runtime-html';

import SlotMachineGen from 'slot-machine-gen';
import 'slot-machine-gen/dist/slot-machine.min.css';

@customElement({
  name: 'slot-machine',
  template: '<div id="${id}" class="slot-machine" ref="containerElm"></div>'
})

/**
 * Provides Aurelia Component wrapper.
 */
export class SlotMachine implements ICustomElementViewModel {
  private containerElm: HTMLElement;

  public slot: SlotMachineGen;

  @bindable id = 'slot-machine';
  @bindable play = false;
  @bindable reels = [];
  @bindable options = {};
  @bindable callback = () => {};

  /**
   * @inheritdoc
   */
  public attached() {
    this.slot = new SlotMachineGen(
      this.containerElm,
      this.reels,
      this.callback,
      this.options
    );
  }

  public playChanged(newValue: any, oldValue: any) {
    if (newValue !== oldValue) {
      this.slot?.play();
    }
  }
}
