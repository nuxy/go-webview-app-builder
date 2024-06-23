// Local modules.
import {reelStrip1, reelStrip2, reelStrip3} from './game-images';
import {reelsBegin, reelsEnd, winner}       from './game-sounds';

export class Game {
  public title = 'Embedded source';

  // Slot-Machine-Gen
  // @see https://github.com/nuxy/slot-machine-gen?tab=readme-ov-file#usage
  public options = {
    sounds: {reelsBegin, reelsEnd}
  };

  public reels = [
    {
      imageSrc: reelStrip1,
      symbols: [
        {
          title: 'cherry',
          position: 100,
          weight: 2
        },
        {
          title: 'plum',
          position: 300,
          weight: 6
        },
        {
          title: 'orange',
          position: 500,
          weight: 5
        },
        {
          title: 'bell',
          position: 700,
          weight: 1
        },
        {
          title: 'cherry',
          position: 900,
          weight: 3
        },
        {
          title: 'plum',
          position: 1100,
          weight: 5
        }
      ]
    },
    {
      imageSrc: reelStrip2,
      symbols: [
        {
          title: 'orange',
          position: 100,
          weight: 6
        },
        {
          title: 'plum',
          position: 300,
          weight: 5
        },
        {
          title: 'orange',
          position: 500,
          weight: 3
        },
        {
          title: 'plum',
          position: 700,
          weight: 5
        },
        {
          title: 'cherry',
          position: 900,
          weight: 2
        },
        {
          title: 'bell',
          position: 1100,
          weight: 1
        }
      ]
    },
    {
      imageSrc: reelStrip3,
      symbols: [
        {
          title: 'cherry',
          position: 100,
          weight: 4
        },
        {
          title: 'bell',
          position: 300,
          weight: 1
        },
        {
          title: 'orange',
          position: 500,
          weight: 6
        },
        {
          title: 'plum',
          position: 700,
          weight: 5
        },
        {
          title: 'plum',
          position: 900,
          weight: 3
        },
        {
          title: 'cherry',
          position: 1100,
          weight: 2
        }
      ]
    }
  ];

  public callback = function(payLine) {

    // If all three symbols match..
    if (payLine[0].title === payLine[1].title && payLine[0].title === payLine[2].title) {
      (new Audio(winner)).play();
    }
  };
}
