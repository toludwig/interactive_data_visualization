// Here the source: https://codepen.io/2rod/pen/JtIki

// Define start dates
var lowerbound = new Date('2013.01.01');
var upperbound = new Date('2017.01.01');

// Function for right date format
function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return month + '/' + day + '/' + year;
}

// Interactive slider
$(function() {
    var slider = $( "#slider-range" ).slider({
      range: true,
      min: new Date('2013.01.01').getTime() / 1000,
      max: new Date('2017.01.01').getTime() / 1000,
      step: 86400,
      values: [ lowerbound.getTime() / 1000, upperbound.getTime() / 1000 ],
      slide: function (event, ui){
         // get selected dates to filter data
         lowerbound = (new Date(ui.values[ 0 ] *1000) );
         upperbound = (new Date(ui.values[ 1 ] *1000) );
         //drawPoints(); 
          
         // Set handles 
         var delay = function() {
            var handleIndex = $(ui.handle).index(); // gives index for selected handler
            var label = handleIndex == 1 ? '#min' : '#max'; //set between min und max handlers depending on index  
                $(label).html(getFormattedDate(new Date(ui.value *1000))).position({
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
    // Initial position of date describtion for min und max handler
    $('#min').html(getFormattedDate(new  Date($('#slider-range').slider('values', 0)*1000))).position({
        my: 'center top',
        at: 'center bottom',
        of: $('#slider-range span:eq(0)'),
        offset: "0, 10"
    });
    $('#max').html(getFormattedDate(new  Date($('#slider-range').slider('values', 1)*1000))).position({
        my: 'center top',
        at: 'center bottom',
        of: $('#slider-range span:eq(1)'),
        offset: "0, 10"
    });
    // Set color of slider
    $( "#coloredSlider .ui-slider-range" ).css( "background-color" );
});


