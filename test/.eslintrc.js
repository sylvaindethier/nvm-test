module.exports = {
  env: {
    // browser: true, // browser global variables.
    node: true, // Node.js global variables and Node.js scoping.
    // commonjs: true, // CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
    // worker: true, // web workers global variables.
    // amd: true, // defines require() and define() as global variables as per the amd spec.
    mocha: true, // adds all of the Mocha testing global variables.
    // jasmine: true, // adds all of the Jasmine testing global variables for version 1.3 and 2.0.
    // jest: true, // Jest global variables.
    // phantomjs: true, // PhantomJS global variables.
    // protractor: true, // Protractor global variables.
    // qunit: true, // QUnit global variables.
    // jquery: true, // jQuery global variables.
    // prototypejs: true, // Prototype.js global variables.
    // shelljs: true, // ShellJS global variables.
    // meteor: true, // Meteor global variables.
    // mongo: true, // MongoDB global variables.
    // applescript: true, // AppleScript global variables.
    // nashorn: true, // Java 8 Nashorn global variables.
    // serviceworker: true, // Service Worker global variables.
    // embertest: true, // Ember test helper globals.
    // webextensions: true, // WebExtensions globals.
    // es6: true, // enable all ECMAScript 6 features except for modules.
  },

  rules: {
    'max-len': [1, 100, 4],
  },
};
