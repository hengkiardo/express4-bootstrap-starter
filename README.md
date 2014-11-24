![ExpressJS 4 Starter](https://github.com/aredo/express4-bootstrap-starter/raw/master/public/apple-touch-icon-144-precomposed.png)

ExpressJS 4 Starter
==========================
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/aredo/express4-bootstrap-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Lightweight Bootstrap NodeJS Apps Build Using ExpressJS 4, MongoDB/Mongoose, Authentication with Passport.js, Jade and GruntJS as Task Automation

[![Build Status](https://travis-ci.org/aredo/express4-bootstrap-starter.svg?branch=master)](https://travis-ci.org/aredo/express4-bootstrap-starter)
[![Dependencies Status](https://david-dm.org/aredo/express4-bootstrap-starter.png)](https://david-dm.org/aredo/express4-bootstrap-starter)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Install

### Prerequisites
- Node.js - Download and Install Node.js with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MongoDB - Download and Install [MongoDB](http://www.mongodb.org/) - Make sure it's running on the default port.

### Tool Prerequisites

- [NPM](https://npmjs.org) - Node.js package manager, should be installed when you install node.js. NPM (Node Package Manager) will look at the [package.json](https://github.com/jpotts18/mean-stack-relational/blob/master/package.json) file in the root of the project and download all of the necessary dependencies and put them in a folder called ```node_modules```
- [Genghis](http://genghisapp.com/) - The single-file MongoDB admin app

### Javascript Tools Used
- [Grunt](http://gruntjs.com/) - In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a Grunt can do most of that mundane work for you—and your team—with basically zero effort.


**NOTE:**
After installing  Node.js and MongoDB server has running, then its time to running your server.

```
  $ git clone git@github.com:aredo/express4-bootstrap-starter.git
  $ cd express4-bootstrap-starter
  $ npm install
  $ cp app/config/config.example.js app/config/config.js
  $ grunt
```

Then visit [http://localhost:3001/](http://localhost:3001/)


### NPM Modules Used
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
- [Passport](http://passportjs.org/) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
- [Mongoose](mongoosejs.com/docs/api.html) - Elegant [MongoDB](http://www.mongodb.org/) object modeling for **Node.JS**. Mongoose provides a straight-forward, schema-based solution to modeling your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- [LESS.JS](http://lesscss.org/) - Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themable and extendable.


### Directory structure

```
-app/
  |__config/
  |__controllers/
  |__helper
  |__models/
  |__mailer/
  |__views/
  |__routes

-public/
  |__css (all files will generate from Grunt)
  |__js
  |__less
  |__fonts
  |__img
  favicon.ico
-Grunfile.coffee
```


# Troubleshooting

During install some of you may encounter some issues feel free to contact me [@hengkiardo](http://twitter.com/hengkiardo) or submit [issue](https://github.com/aredo/express4-bootstrap-starter/issues). via the repository issue tracker or the links provided below. I am also available on twitter [@hengkiardo](http://twitter.com/hengkiardo).
