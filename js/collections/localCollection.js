define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/surfModel'
], function(_, Backbone, SurfModel){
  var GlobalCollection = Backbone.Collection.extend({
    initialize: function(models,options){
      this.id = options;

      this.sortVar = 'start_timestamp';
      this.sOrder = "asc";
    },
    url: function(){
      //mongodb route here
      //add a baseurl here
      return 'http://localhost:8888/local/'+this.id;
    },
    model: SurfModel,
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
  return GlobalCollection;
});