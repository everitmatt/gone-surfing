// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'loading': 'showLoading',
      'global': 'showGlobal',
      'local/:id': 'showLocal',
      'user/:id': 'showUser',
      'personal': 'showPersonal',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    window.location.hash = 'loading';
    app_router.on('route:showLoading', function(){
      require(["views/loadingView"],function(LoadingView){
        var loadingView = new LoadingView();
        loadingView.render();
      });
    });
    app_router.on('route:showGlobal', function(){
      require(["views/globalView"],function(GlobalView){
        var globalView = new GlobalView();
        globalView.render();
      });
    });
      // As above, call render on our loaded module
      // 'views/users/list'
    app_router.on('route:showLocal', function(id){
      require(["views/localView"],function(LocalView){
        var localView = new LocalView(id);
        localView.render();
      });
    });
    app_router.on('route:showUser', function(id){
      require(["views/userView"],function(UserView){
        var userView = new UserView(id);
        userView.render();
      });
    });
    app_router.on('route:showPersonal', function(){
      var personalView = new PersonalView();
      personalView.render();
    });
    app_router.on('route:defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    });
    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});
