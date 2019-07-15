# JavaScript Port of Jared Tarbell's Computational Substrate

The original computational art work done by Jared Tarbell can be found
[here](http://www.complexification.net/gallery/machines/substrate/index.php).

This repo is my attempt to port it into JavaScript.

![RESULT](https://raw.githubusercontent.com/shinaisan/substrate-js/master/RESULT.JPG)

The algorithm is quite simple yet the eventual city-like structure is amazing. At the beginning it just plants some random seeds on a canvas from which cracks grow.
If a crack reaches the canvas border or touches another crack, a new crack perpendicularly branches out from an existing crack.

## Demo Page

The script can be tested on [the demo page](https://shinaisan.github.io/substrate-js/) and you can see the rendering in motion.

## Files

- `index.html`: HTML file to display rendering.
- `substrate.js`: My JavaScript port of the algorithm.

## Variation 1

I made a derivative work that simply change the branch angle from 90 degrees to about 45 degrees.

![45](https://raw.githubusercontent.com/shinaisan/substrate-js/master/45.JPG)

## Variation 2

In this variation, cracks slightly change their angle of moving direction along the way.

![ROUND](https://raw.githubusercontent.com/shinaisan/substrate-js/master/ROUND.JPG)

## Note on Script

### Parameters

- `maxnum`: The maximum number of cracks. An instance of crack is spawned by a function `makeCrack`.
- `maxpal`: The maximum number of colors taken from the `IMG.PNG`.

### Data

- `cgrid`: An array linearized in such a way that a point (x,y) is translated into an index (dimx*y + x) in the array. An element corresponding to a (x, y) position contains an integral value of the angle (0-360) between the x-axis and the direction in which a crack on that point grows.

### Functions/Methods

- `makeCrack` function: Spawns an instance of crack if there are less than `maxnum` instances. A crack stops growing when encountering another crack or the canvas boundary and at the same time it spawn a new crack with this function.
- `Crack` constructor: Creates an instance of crack. The initial position of a crack is determined by the `findStart` function.
- `Crack.findStart` method: As suggested by the name, it looks for a pixel of an existing crack or a "seed" pixel planted on the canvas and then employ the position of the pixel as a starting point of the crack instance.
- `Crack.move` method: Advances the x-y position of the crack instance. If the crack is found to be on another crack or out of bounds, it repositions itself by `findStart` and calls the `makeCrack` function to spawn new one.

