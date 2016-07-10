# Palimpsest.NW
A basic template for deploying a game written in [ink](https://github.com/inkle/ink) as a stand-alone desktop app. Uses [inkJS](https://github.com/y-lohse/inkjs), [NW.js](http://nwjs.io/), [Stylus](http://stylus-lang.com/) with [Axis](http://axis.netlify.com/), [Jeet](http://jeet.gs/) and [Rupture](http://jescalan.github.io/rupture/), [Pug](http://jade-lang.com/) and jQuery. Primarily tested on OSX El Capitan, should theoretically work on Windows and Linux.

Put together and maintained by Isak Grozny. Forks, pull requests and other contributions very much welcome.

## Installation

These instructions written with the assumption that you don't know what any of these files do.

* Install [Make](https://www.gnu.org/software/make/), if you don't have it already. If you're a Windows user, you probably don't have it.
* Install [Node.js](https://nodejs.org) if you don't have it already. Node.js ships with NPM, so that's two birds in the hand.
* After you have Node.js and NPM, install [Bower](https://bower.io/#install-bower).
* Install Gulp by running ``npm i -g gulp-cli`` in the commandline. This installs the Gulp CLI. If you already have it, make sure it's up-to-date, because this repository uses Gulp 4. 

After you've done all that, clone or download this repository, open it on the commandline and run:

``
make -f Makefile-init
``

This sets up the repository for developing your ink app.

To compile CSS, JavaScript and HTML, move required app files to their own directory and run an instance of your app all at once, run:

``
make
``

To load your own game into the app, edit ``line 7`` in ``assets/js/game.js`` -- replace ``the-intercept.json`` with your own compiled ink file. For instructions on how to compile ``.ink`` files into ``.json``, see [ink's repo](https://github.com/inkle/ink). 

## Customizing the App

* To change the *appearance* of the app, edit ``main.styl`` and run ``gulp css`` from the commandline.
* To change the HTML layout, edit ``index.pug`` and run ``gulp html`` from the commandline.
* To change the *behaviour* of the app, edit ``game.js`` and the JavaScript inside the ``script`` tag in ``index.pug``. Refer to [NW.js](http://docs.nwjs.io/) docs if you want to do things like add a menu, make the app fullscreen, etcetera.
* You can add JavaScript libraries by dropping them into ``src/js`` and running ``gulp js`` from the commandline to concat (combine) and compile the scripts.

## To Do

* Add licenses
* Make the ``.styl`` and ``.js`` files easier to customize for novices
* Make several different templates for presenting text adventures
* Implement loading images, sprites and audio

## Caveats

* Make sure to include ``@require 'jeet'`` at the top of ``main.styl`` for the time being, as Jeet is not importing properly from the Gulp task.
