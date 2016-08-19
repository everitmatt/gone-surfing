define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'collections/locationCollection',
  'data/distinct-locations',
  'text!templates/locations-template.html',
], function($, _, Backbone, LocationCollection, distinctLocations, globalTemplate){
  var GlobalView = Backbone.View.extend({

    el: $('#container'),
    filter: false,
    comparator: '',
    ascending: true,

    initialize: function(){
      this.collection = new LocationCollection();
      var _this = this;
      this.collection.fetch({
        success: function(response){
          _this.render();
        },
        error: function(e){
          console.log("error: "+e);
        }
      });
      this.$el.find('#menu').slideDown();
    },

    events: {
      'keyup .location-filter' : 'filterLocations',
      'click .sort': 'sortCollection',
      'click .detected-location-name' : 'showLocation'
    },

    render: function(){
      _.templateSettings.variable = "rc";
      this.$el.find('#content').empty();
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(globalTemplate);
      // Append our compiled template to this Views "el"
      this.$el.find('#content').append( compiledTemplate(this.collection.toJSON()) );
    },

    filterLocations: function(e){
      e.preventDefault();

      this.filter = true;

      var search = e.currentTarget.value;
      var filtered = this.collection.filter(function(model){
        return model.get('detected_location_name').toLowerCase().indexOf(search) !== -1;
      });
      this.filtered = new LocationCollection(filtered);
      this.applyFilter();
    },

    applyFilter: function(){
      _.templateSettings.variable = "rc";
      this.$el.find('#content').empty();
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(globalTemplate);
      // Append our compiled template to this Views "el"
      this.$el.find('#content').append( compiledTemplate(this.filtered.toJSON()) );
    },

    sortCollection: function(e) {
      e.preventDefault();
      var c = e.currentTarget.dataset.comparator;

      if(this.comparator == c){
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
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

    showLocation: function(e){
      this.undelegateEvents();
      e.preventDefault();
      var route = e.currentTarget.dataset.name;
      // var str = e.currentTarget.dataset.name.split(',')[0];
      // var route = str.replace(/ /g, '');
      Backbone.history.navigate('local/'+route,true);
    }

  });
  // Our module now returns our view
  return GlobalView;
});