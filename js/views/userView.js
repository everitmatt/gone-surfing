define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'collections/userCollection',
  'models/surfModel',
  'text!templates/user-template.html'
], function($, _, Backbone, UserCollection, SurfModel, userTemplate){
  var UserView = Backbone.View.extend({

    el: $('#container'),
    filter: false,
    comparator: '',
    ascending: false,

    initialize: function(options){
      this.id = options;
      this.collection = new UserCollection([],this.id);
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
      //   if(app.surfs[i].id == this.id && app.surfs[i].wave_count !== 0){
      //     var s = new SurfModel(app.surfs[i]);
      //     this.collection.add( s );
      //   }
      // }
    },

    events: {
      'click .sort': 'sortCollection'
    },

    render: function(){
      _.templateSettings.variable = "rc";

      this.$el.find('#content').empty();
      
      var compiledTemplate = _.template(userTemplate);
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

    applyFilter: function(i,c){
      _.templateSettings.variable = "rc";
      this.$el.find('#content').empty();
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(userTemplate);
      // Append our compiled template to this Views "el"
      this.$el.find('#content').append( compiledTemplate({
        title: i,
        data: c.toJSON()
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
        this.filter.Sort(c,sOrder);
        // this.filtered.comparator = c;
        // this.filtered.sort();
        this.applyFilter();
      }
    },

  });
  // Our module now returns our view
  return UserView;
});