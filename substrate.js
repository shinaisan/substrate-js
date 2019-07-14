function substrate() {

  var img = document.getElementById("color-source");

  function setup() {
    // variation: 0 => original
    // variation: 1 => 45 degrees branch
    var ctx = {
      variation: 2,
      dimx: 400,
      dimy: 400,
      maxnum: 30,
      maxpal: 4,
      backgroundColor: "#ffffff",
      stop: false
    };
    substrate.ctx = ctx;
    ctx.goodcolor = [];
    var canvas = document.getElementById("canvas");
    var g = canvas.getContext("2d");
    ctx.canvas = canvas;
    ctx.g = g;
    ctx.width = canvas.width = ctx.dimx;
    ctx.height = canvas.height = ctx.dimy;
    takecolor(ctx);

    background(ctx);

    begin(ctx);

    setInterval(function() {draw(ctx);}, 10);

    setupUI(ctx);

    return ctx;
  }

  function setupUI(ctx) {
    var stopButton = document.getElementById("button-stop");
    var restartButton = document.getElementById("button-restart");
    stopButton.addEventListener('click', function() {
      ctx.stop = !ctx.stop;
      if (ctx.stop) {
        stopButton.innerText = "RESUME";
      } else {
        stopButton.innerText = "STOP";
      }
    });
    restartButton.addEventListener('click', function() {
      begin(ctx);
    });
  }

  function background(ctx) {
    ctx.g.strokeStyle = ctx.backgroundColor;
    ctx.g.fillStyle = ctx.backgroundColor;
    ctx.g.fillRect(0, 0, ctx.width, ctx.height);
  }

  function rgba(r, g, b, a) {
    return (
      "rgba(" + r + "," + g + "," + b + "," + a + ")"
    );
  }

  function rgb(r, g, b) {
    return rgba(r, g, b, 1.0);
  }

  function somecolor(ctx) {
    return ctx.goodcolor[Math.floor(ctx.goodcolor.length * Math.random())];
  }

  function loadImage() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    return canvas;
  }

  function takecolor(ctx) {
    var maxpal = ctx.maxpal;
    var goodcolor = ctx.goodcolor;
    var canvas = loadImage();
    var w = canvas.width;
    var h = canvas.height;
    var b = canvas.getContext('2d').getImageData(0, 0, w, h).data;
    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y++) {
        var c = {
          r: b[4 * (y * w + x) + 0],
          g: b[4 * (y * w + x) + 1],
          b: b[4 * (y * w + x) + 2],
          a: b[4 * (y * w + x) + 3]
        };
        var exists = false;
        for (var n = 0; n < goodcolor.length; n++) {
          if ((c.r == goodcolor[n].r) &&
            (c.g == goodcolor[n].g) &&
            (c.b == goodcolor[n].b) &&
            (c.a == goodcolor[n].a)
          ) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          // Not in the original implementation.
          if (Math.random() > (maxpal / w / h)) {
            continue;
          }
          // Add color to pal
          if (goodcolor.length < maxpal) {
            goodcolor.push(c);
          }
        }
      }
    }
  }

  function draw(ctx) {
    if (ctx.stop) return;
    var cracks = ctx.cracks;
    var num = cracks.length;
    for (var n = 0; n < num; n++) {
      cracks[n].move();
    }
  }

  function makeCrack(ctx) {
    var maxnum = ctx.maxnum;
    var cracks = ctx.cracks;
    var num = cracks.length;
    if (num < maxnum) {
      // Make a new crack instance
      cracks.push(new Crack(ctx));
    }
  }

  function begin(ctx) {
    var dimx = ctx.dimx;
    var dimy = ctx.dimy;
    ctx.cgrid = Array(ctx.dimx * ctx.dimy).fill(0);
    ctx.cracks = [];
    var cgrid = ctx.cgrid;
    // Erase crack grid
    for (var y = 0; y < dimy; y++) {
      for (var x = 0; x < dimx; x++) {
        cgrid[y * dimx + x] = 10001;
      }
    }
    // Make random crack seeds
    for (var k = 0; k < 16; k++) {
      var i = Math.floor((dimx * dimy - 1) * Math.random());
      cgrid[i] = Math.floor(360 * Math.random());
    }
    // Make just three cracks
    for (var k = 0; k < 3; k++) {
      makeCrack(ctx);
    }
    background(ctx);
  }

  function Crack(ctx) {
    this.x = 0;
    this.y = 0;
    this.t = 0;
    this.ctx = ctx;

    this.findStart();

    this.painter = new SandPainter(ctx);

    return this;
  }

  if (true) {

    function findStart_0() {
      var ctx = this.ctx;
      // Pick a random point
      var px = 0;
      var py = 0;
      // Shift until crack is found
      var found = false;
      var timeout = 0;
      var dimx = ctx.dimx;
      var dimy = ctx.dimy;
      var cgrid = ctx.cgrid;
      // The original condition is ((!found) || (timeout++ > 1000)) ...
      while ((!found) && (timeout++ < ctx.dimx * ctx.dimy)) {
        px = Math.floor(Math.random() * ctx.dimx);
        py = Math.floor(Math.random() * ctx.dimy);
        if (cgrid[py * dimx + px] < 10000) {
          found = true;
        }
      }
      if (found) {
        // Start crack
        var a = cgrid[py * dimx + px];
        if (Math.random() < 0.5) {
          a -= 88 + Math.floor(Math.random() * 4.1);
        } else {
          a += 88 + Math.floor(Math.random() * 4.1);
        }
        this.startCrack(px, py, a);
      }
      return found;
    }

    function findStart_1() {
      var ctx = this.ctx;
      // Pick a random point
      var px = 0;
      var py = 0;
      // Shift until crack is found
      var found = false;
      var timeout = 0;
      var dimx = ctx.dimx;
      var dimy = ctx.dimy;
      var cgrid = ctx.cgrid;
      // The original condition is ((!found) || (timeout++ > 1000)) ...
      while ((!found) && (timeout++ < ctx.dimx * ctx.dimy)) {
        px = Math.floor(Math.random() * ctx.dimx);
        py = Math.floor(Math.random() * ctx.dimy);
        if (cgrid[py * dimx + px] < 10000) {
          found = true;
        }
      }
      if (found) {
        // Start crack
        var a = cgrid[py * dimx + px];
        if (Math.random() < 0.5) {
          a -= 0 + Math.floor(Math.random() * 45);
        } else {
          a += 0 + Math.floor(Math.random() * 45);
        }
        this.startCrack(px, py, a);
      }
      return found;
    }

    // Variations
    var findStartFuncs = [
      findStart_0,
      findStart_1,
      findStart_0
    ];

    function startCrack(X, Y, T) {
      this.x = X;
      this.y = Y;
      this.t = T; // %360
      this.x += 0.61 * Math.cos(this.t * Math.PI / 180);
      this.y += 0.61 * Math.sin(this.t * Math.PI / 180);
    }

    function move() {
      var ctx = this.ctx;
      var dimx = ctx.dimx;
      var dimy = ctx.dimy;
      var cgrid = ctx.cgrid;
      if (ctx.variation == 2) {
        if (Math.random() < 0.2) {
          this.t += -1 + Math.floor(2 * Math.random());
          this.t += 360;
          this.t %= 360;
        }
      }
      // Continue cracking
      this.x += 0.42 * Math.cos(this.t * Math.PI / 180);
      this.y += 0.42 * Math.sin(this.t * Math.PI / 180);
      // Bound check
      var z = 0.33;
      var cx = Math.floor(this.x - z + 2 * Math.random() * z); // Add fuzz
      var cy = Math.floor(this.y - z + 2 * Math.random() * z);
      // Draw sand painter
      this.regionColor();
      // Draw black crack
      ctx.g.fillStyle = rgba(0, 0, 0, 0.85);
      ctx.g.fillRect(cx, cy, 1, 1);
      if ((cx >= 0) && (cx < dimx) && (cy >= 0) && (cy < dimy)) {
        // Safe to check
        if ((cgrid[cy * dimx + cx] > 10000) || (Math.abs(cgrid[cy * dimx + cx] - this.t) < 5)) {
          // Continue cracking
          cgrid[cy * dimx + cx] = Math.floor(this.t);
        } else if (Math.abs(cgrid[cy * dimx + cx] - this.t) > 2) {
          // Crack encountered (not self), stop cracking
          this.findStart();
          makeCrack(ctx);
        }
      } else {
        this.findStart();
        makeCrack(ctx);
      }
    }

    function regionColor() {
      var ctx = this.ctx;
      // Start checking one step away
      var rx = this.x;
      var ry = this.y;
      var openspace = true;
      var dimx = ctx.dimx;
      var dimy = ctx.dimy;
      var cgrid = ctx.cgrid;
      // Find extents of open space
      while (openspace) {
        // Move perpendicular to crack
        rx += 0.81 * Math.sin(this.t * Math.PI / 180);
        ry -= 0.81 * Math.cos(this.t * Math.PI / 180);
        var cx = Math.floor(rx);
        var cy = Math.floor(ry);
        if ((cx >= 0) && (cx < dimx) && (cy >= 0) && (cy < dimy)) {
          // Safe to check
          if (cgrid[cy * dimx + cx] > 10000) {
            // Space is open
          } else {
            openspace = false;
          }
        } else {
          openspace = false;
        }
      }
      // Draw sand painter
      this.painter.render(rx, ry, this.x, this.y);
    }

    Crack.prototype.findStart = function() {
      return findStartFuncs[this.ctx.variation].apply(this);
    };
    Crack.prototype.startCrack = startCrack;
    Crack.prototype.move = move;
    Crack.prototype.regionColor = regionColor;

  }

  function SandPainter(ctx) {
    this.ctx = ctx;
    this.useOriginalSandPainter = false;
    this.color = somecolor(ctx);
    this.g = 0.01 + 0.09 * Math.random();
    return this;
  }

  if (true) {
    function render(x, y, ox, oy) {
      var ctx = this.ctx;
      // Modulate gain
      var g = this.g;
      g += (-0.050 + 0.100 * Math.random());
      var maxg = 1.0;
      if (g < 0) g = 0;
      if (g > maxg) g = maxg;
      // Calculate grains by distance
      var grains = 64;
      // Lay down grains of sand (transparent pixels)
      var w = g/(grains - 1);
      for (var i = 0; i < grains; i++) {
        var c = this.color;
        var a = 0.1 - i / (grains * 10.0);
        ctx.g.fillStyle = rgba(c.r, c.g, c.b, a);
        if (this.useOriginalSandPainter) {
          // Not sure for the rationale behind the math...
          ctx.g.fillRect(
            ox + (x - ox) * Math.sin(Math.sin(i * w)),
            oy + (y - oy) * Math.sin(Math.sin(i * w)),
            1, 1
          );
        } else {
          ctx.g.fillRect(
            ox + (x - ox)*Math.sin(i * w),
            oy + (y - oy)*Math.sin(i * w),
            1, 1);
        }
      }
      this.g = g;
    }

    SandPainter.prototype.render = render;
  }

  setup();

}

