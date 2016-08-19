define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/locationModel'
], function(_, Backbone, LocationModel){
  var LocationCollection = Backbone.Collection.extend({
    initialize: function(){
      this.sortVar = 'surf_count';
      this.sOrder = "desc";
    },
    model: LocationModel,
    url: function(){
      //mongodb route here
      //add a baseurl here
      return 'http://localhost:8888/locations';
    },
    comparator: function(modelA, modelB){
      var a = modelA.get(this.sortVar);
      var b = modelB.get(this.sortVar);
      if (this.sOrder == "asc") {
            return this.SortCustom(a, b);
      }
      return -this.SortCustom(a, b);
    },
    SortCustom:function(a,b){
                if (isNaN(a)) {
                    if (isNaN(b)) {
                        if (a > b) return 1; // before
                        if (b > a) return -1; // after
                        return 0;
                    }
                    return 1;
                }
                if (isNaN(b)) {
                    return -1;
                }
                if (+a > +b) return 1; // before
                if (+b > +a) return -1; // after
                return 0;
    },
    Sort: function(by, order) {
      this.sOrder = order;
      this.sortVar = by;
      this.sort();
    }
  });
  // You don't usually return a collection instantiated
  return LocationCollection;
});