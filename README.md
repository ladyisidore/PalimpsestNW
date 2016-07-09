# Palimpsest.NW
A basic template for deploying a game written in [ink](https://github.com/inkle/ink) as a stand-alone desktop app. Uses [inkJS](https://github.com/y-lohse/inkjs), [NW.js](http://nwjs.io/), [Stylus](http://stylus-lang.com/) with [Axis](http://axis.netlify.com/), [Jeet](http://jeet.gs/) and [Rupture](http://jescalan.github.io/rupture/), [Pug](http://jade-lang.com/) and jQuery. Primarily tested on OSX El Capitan, should theoretically work on Windows and Linux.

Put together and maintained by Isak Grozny. Forks, pull requests and other contributions very much welcome.

# Installation

Clone or download this repository, cd into it and then, to set everything up, run:

``
make -f Makefile-init
``

To compile CSS, JavaScript and HTML, move required app files to their own directory and run an instance of your app:

``
make
``

To load your own game into the app, edit ``line 7`` in ``assets/js/game.js`` -- replace ``the-intercept.json`` with your own compiled ink file. For instructions on how to do that, see [ink's repo](https://github.com/inkle/ink).

# To Do

* add licenses
* make the ``.styl`` and ``.js`` files easier to customize for novices
* make several different templates for presenting text adventures
* implement loading images, sprites and audio
