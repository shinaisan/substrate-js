# JavaScript Port of Jared Tarbell's Computational Substrate

The original computational art work done by Jared Tarbell can be found
[here](http://www.complexification.net/gallery/machines/substrate/index.php).

This repo is my attempt to port it into JavaScript.

![RESULT](https://raw.githubusercontent.com/shinaisan/substrate-js/master/RESULT.JPG)

The algorithm is quite simple yet the eventual city-like structure is amazing. At the beginning it just plants some random seeds on a canvas from which cracks grow.
If a crack reaches the canvas border or touches another crack, a new crack perpendicularly branches out from an existing crack.

## Files

- `index.html`: HTML file to display rendering.
- `substrate.js`: My JavaScript port of the algorithm.

