define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/surfModel'
], function(_, Backbone, SurfModel){
  var GlobalCollection = Backbone.Collection.extend({
    model: SurfModel,
    url: function(){
      //mongodb route here
      //add a baseurl here
      return 'http://localhost:8888/locations';
    },
  });
  // You don't usually return a collection instantiated
  return GlobalCollection;
});