/* this is just for spining arrow  - please notice that center: ["50%", "100%"] is set like this to correctly offset center of rotation for arrow_img image */

/*

$(window).load(function(){
var rotation = function (){
   $("#arrow_img").rotate({
      angle:0, 
      animateTo:360, 
	  center: ["50%", "100%"],
      callback: rotation,
      easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
          return c*(t/d)+b;
      }
   });
}
rotation();
});  

*/