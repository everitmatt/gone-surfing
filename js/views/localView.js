define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'collections/localCollection',
  'models/surfModel',
  'text!templates/local-template.html'
], function($, _, Backbone, LocalCollection, SurfModel, localTemplate){
  var LocalView = Backbone.View.extend({

    el: $('#container'),
    filter: false,
    comparator: '',
    ascending: false,

    initialize: function(options){
      this.id = options;
      this.collection = new LocalCollection([],this.id);
      //fetch here with mongo query
      var _this = this;
      this.collection.fetch({
        success: function(response){
          _this.render();
        },
        error: function(e){
          console.log("error: "+e);
        }
      });
      //query collection for specific surfs
      // for(var i = 0; i < app.surfs.length; i++){
      //   if(app.surfs[i].detected_location_name == this.id && app.surfs[i].wave_count !== 0){
      //     var s = new SurfModel(app.surfs[i]);
      //     this.collection.add( s );
      //   }
      // }
    },
    events: {
      'click .surfer-id' : 'filterForSurfer',
      'click .sort': 'sortCollection'
    },

    render: function(){
      _.templateSettings.variable = "rc";

      this.$el.find('#content').empty();
      
      var compiledTemplate = _.template(localTemplate);
      this.$el.find('#content').append( compiledTemplate({
        title: this.id,
        data: this.collection.toJSON()
        }) );

      var width = document.getElementById('content').offsetWidth;
      var height = window.innerHeight;
      var canvas = document.getElementById('canvas');
      var stepX = width/this.collection.length;

      // canvas.width = width;
      // canvas.height = height;

      // var ctx = canvas.getContext('2d');

      // for(var i = 0; i < this.collection.length; i++){
      //   this.collection.at(i).render(ctx,width,height);
      // }
    },

    renderCanvas: function(){

    },

    filterForSurfer: function(e){
      e.preventDefault();
      this.filter = true;
      var search = e.currentTarget.dataset.id;
      this.filtered = new LocalCollection(this.collection.where({id: search}));
      this.applyFilter(search);
    },

    applyFilter: function(i){
      _.templateSettings.variable = "rc";
      this.$el.find('#content').empty();
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(localTemplate);
      // Append our compiled template to this Views "el"
      this.$el.find('#content').append( compiledTemplate({
        title: this.id,
        data: this.filtered.toJSON()
      }) );
    },

    sortCollection: function(e) {
      e.preventDefault();
      var c = e.currentTarget.dataset.comparator;

      if(this.comparator == c){
        this.ascending = !this.ascending;
      } else {
        this.ascending = false;
      }
      
      this.comparator = c;

      var sOrder = (this.ascending) ? "asc" : "desc";
      if(!this.filter){
        this.collection.Sort(c,sOrder);
        // this.collection.comparator = c;
        // this.collection.sort();
        this.render();
      } else {
        this.filtered.Sort(c,sOrder);
        // this.filtered.comparator = c;
        // this.filtered.sort();
        this.applyFilter();
      }
    },

  });
  // Our module now returns our view
  return LocalView;
});