d3.select(window).on('load', init);

function init() {
    d3.csv("station_short.csv", 
           function(mydata){
                //Parse Data into useable format
                mydata.forEach(function(d){
                    d.metANN = +d.metANN;
                    d.YEAR = d.YEAR;
                    //the + sign converts numeric string to number
                });  
  console.table(mydata);
  var formatter = d3.format("04"); 
  var svg = d3.select('svg');
  var width = parseFloat(svg.node().style.width);
  var height = parseFloat(svg.node().style.height);
  
  var padding = 30;
  
  var xScale = d3.scaleLinear()
      .domain([d3.min(mydata,
                      function(d){
                        return d.YEAR;
                      }),
               d3.max(mydata, 
                      function(d){
                        return d.YEAR;
                      })])
      .range([padding,width-padding]);

  var yScale = d3.scaleLinear()
      .domain([d3.min(mydata,
                      function(d){
                        return d.metANN;
                      }),
               d3.max(mydata, 
                      function(d){
                        return d.metANN;
                      })])
      .range([height-padding, padding]);

  d3.select("#plot1")
    .selectAll("circle")
    .data(mydata)
    .enter()
    .append("circle")
    .attr("r", "2px")
    .attr("cx", function(d){
                  return ""+xScale(d.YEAR)+"px";
                })
    .attr("cy", function(d){
                  return ""+yScale(d.metANN)+"px";
                })
  
  d3.select("#plot1")
    .append('g')
    .attr('transform', 'translate(0,' + (height - padding) + ')')
    .call(d3.axisBottom(xScale).tickFormat(formatter));
  d3.select("#plot1")
    .append('g')
    .attr('transform', 'translate('+padding+', 0)')
    .call(d3.axisLeft(yScale));

    });

}