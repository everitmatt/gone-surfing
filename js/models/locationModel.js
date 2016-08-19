define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var LocationModel = Backbone.Model.extend({
    defaults: {
      name: "",
      latitude: "",
      longitude: "",
      surf_count: ""
    }
  });
  // Return the model for the module
  return LocationModel;
});