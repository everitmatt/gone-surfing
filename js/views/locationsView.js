define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'collections/globalCollection',
  'data/distinct-locations',
  'text!templates/locations-template.html'
], function($, _, Backbone, GlobalCollection, distinctLocations, globalTemplate){
  var GlobalView = Backbone.View.extend({
    el: $('#container'),
    render: function(){
          _.templateSettings.variable = "rc";
      // Using Underscore we can compile our template with data
      this.collection = new GlobalCollection(distinctLocations);
      var compiledTemplate = _.template( globalTemplate);
      // Append our compiled template to this Views "el"
      this.$el.append( compiledTemplate(this.collection.toJSON()) );
    }
  });
  // Our module now returns our view
  return GlobalView;
});