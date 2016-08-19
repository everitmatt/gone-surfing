// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){

  var App = {

    initialize: function(){
      // Pass in our Router module and call it's initialize function
      Router.initialize();
    }
  }

  return App;
});