// Here the source: https://codepen.io/2rod/pen/JtIki

// Function for display of right date format
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
      values: [ new Date('2013.01.01').getTime() / 1000, new Date('2017.01.01').getTime() / 1000 ],
      slide: function (event, ui){
         // Set handles 
         var labelHandels = function() {
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
            setTimeout(labelHandels, 5); 
        },
        stop: function (event, ui){
            var timeSelection = function(){
            // get selected dates to filter data
            FILTER.lowerdate = (new Date(ui.values[ 0 ] *1000) );
            FILTER.upperdate = (new Date(ui.values[ 1 ] *1000) ); 
            drawPoints();
            };
            timeSelection();
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


