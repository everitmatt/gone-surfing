// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/underscore.min',
    backbone: 'libs/backbone/backbone.min'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  app = App;
  app.initialize();
  app.startTimestamp = 1414819736;
  app.endTimestamp = 1447870200;
  app.totalDuration = app.endTimestamp-app.startTimestamp;
});