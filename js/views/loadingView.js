define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/loading-template.html',
  'text!templates/menu-template.html',
], function($, _, Backbone, loadingTemplate, menuTemplate){
  var LoadingView = Backbone.View.extend({
    el: $('#container'),

    initialize: function(){
      //TODO take this out when using mongo.

      var proIds = [
        '53478b455001c0410ca7c6d2',
        '53478bb25001c0243aa7c6d2',
        '53478bbc4f01c0f120e4aec9',
        '53478d095001c0410ca7c6e9',
        '53478bc25101c0900f3a4381',
        '53478b4a5101c021783a4381',
        '53478bad4f01c01f25e4aec9'
      ];
      
      _.templateSettings.variable = "rc";
      var compiledTemplate = _.template(menuTemplate);
      this.$el.find('#menu').append(compiledTemplate(proIds));
    },

    events: {
      "click #start-btn": "exitLoading"
    },

    render: function(){
      this.$el.find('#content').empty();
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(loadingTemplate);
      // Append our compiled template to this Views "el"
      this.$el.find('#content').append( compiledTemplate());
      this.allDataLoaded();
    },

    loadMaps: function(){

    },

    loadData: function(){
      var _this = this;
      require(["data/01-searchGPS-data"],function(surfs){
        app.surfs = surfs;
        _this.allDataLoaded();
      });
    },

    allDataLoaded : function(){
      $('#loading-text').html("everything is loaded");
    },

    exitLoading: function(){
      Backbone.history.navigate('global',true);
    }
  });
  // Our module now returns our view
  return LoadingView;
});