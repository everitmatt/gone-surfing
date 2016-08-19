define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var SurfModel = Backbone.Model.extend({
    idAttribute: 'surf_id',
    render: function(canvas,width,height){
        // var data = this.attributes;
        // var start = (data.start_timestamp-app.startTimestamp)/app.totalDuration;
        // var swell = data.swell_size;
        // canvas.fillStyle = Math.random() > 0.5 ? "#0000FF" : Math.random() > 0.5 ? "#00FF00" : "#AAFF00";
        // canvas.strokeStyle="red";
        // if(data.previous_location !== null){
        //   canvas.beginPath();
        //   canvas.arc(width*start-height/1.5,height/2,height/1.5,Math.PI*2,Math.PI*1.5,true);
        //   // ctx.closePath();
        //   canvas.stroke();
        // }
        // for(var j = 0; j < data.wave_count; j+=4){
        //   canvas.beginPath();
        //   canvas.arc(width*start,height/2+j,1,0,Math.PI*2,true);
        //   canvas.closePath();
        //   canvas.fill();
        // }
    }
  });
  // Return the model for the module
  return SurfModel;
});