// Here the source: https://codepen.io/2rod/pen/JtIki

var lowerbound = new Date('2015.01.01');
var upperbound = new Date('2015.12.30');
$(function() {
    var slider = $( "#slider-range" ).slider({
      range: true,
      min: new Date('2013.01.01').getTime() / 1000,
      max: new Date('2017.01.01').getTime() / 1000,
      step: 86400,
      values: [ new Date('2015.01.01').getTime() / 1000, new Date('2015.12.30').getTime() / 1000 ],
      slide: function (event, ui){
         lowerbound = (new Date(ui.values[ 0 ] *1000) );
         upperbound = (new Date(ui.values[ 1 ] *1000) );
         //drawPoints(); 
      }
      
    });
    $( "#coloredSlider .ui-slider-range" ).css( "background-color", myColor );
  });


