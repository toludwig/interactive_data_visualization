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
          
         // Set handles
         var delay = function() {
            var handleIndex = $(ui.handle).index();
            var label = handleIndex == 1 ? '#min' : '#max';
             console.log(label);
             console.log(handleIndex);
                $(label).html(new Date(ui.values[ 0 ] *1000).toDateString()).position({
                    my: 'center top',
                    at: 'center bottom',
                    of: ui.handle,
                    offset: "0, 10"
                });
            };

            // wait for the ui.handle to set its position
            setTimeout(delay, 5);
        }
      });
    $('#min').html('$' + $('#slider-range').slider('values', 0)).position({
        my: 'center top',
        at: 'center bottom',
        of: $('#slider-range a:eq(0)'),
        offset: "0, 10"
    });

    $('#max').html( $('#lider-range').slider('values', 1)).position({
        my: 'center top',
        at: 'center bottom',
        of: $('#slider-range a:eq(1)'),
        offset: "0, 10"
    });
    $( "#coloredSlider .ui-slider-range" ).css( "background-color" );
});


