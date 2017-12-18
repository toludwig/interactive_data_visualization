// DRAW POINTS PANEL:
function drawPoints(data) {

    // Select area for points and define layout:
    svg = d3.select("#points");

    width = 700;
    height = 700;
    padding = 70;

    // Scaling:
     var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){
            return d.xy[0];
        }))
        .range([padding, width-padding]);

     var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){
            return d.xy[1];
        }))
        .range([height-padding, padding]);

    // Create the data point circles:
    var circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function (d){
            return (d.id==37 || d.id== 39) ? "outlier" : "inlier";
        })
        .attr("r", "5")
        .attr("cx", function (d) {
            return ""+xScale(d.xy[0])+"px";
        })
        .attr("cy", function (d) {
            return ""+yScale(d.xy[1])+"px";
        })
        .attr("fill", "lightblue")
        .attr("stroke", "black");


    // Check the values by clicking on the circles:
    circles.on("click", function (d) {
        d3.select('#id_value')
            .text(d.id);
        drawHand(d.id);
    });

    // Include x-axis (bottom)
    svg.append('g')
        .attr('transform', 'translate(0,' + (height-padding) + ')')
        .attr("class","axis x")
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .attr("class","axis y")
        .call(d3.axisLeft(yScale));

    // x Axis:
    svg.append("text")
        .attr("fill","black")
        .attr("x", 650)
        .attr("y", 670)
        .attr("dx", "1px")
        .attr("text-anchor", "end")
        .text("PC 1");

    // y Axis:
    svg.append("text")
        .attr("fill", "black")
        .attr("x", 40)
        .attr("y", 70)
        .attr("dy", "1px")
        .attr("text-anchor", "end")
        .text("PC 2");

    // Add title to left panel visualisation:
    svg.append("text")
        .attr("fill","black")
        .attr("x",400)
        .attr("y",50)
        .attr("dy","1px")
        .text("PCA Results");

}


// DRAW HAND PANEL:
function drawHand(id) {
    // Select area for hand drawing

    svg = d3.select("#hand");

    d3.select("#oldHand").remove();

    width  = 700;
    height = 700;
    padding = 70;

    var xScale = d3.scaleLinear()
        .domain([0.1, 1.1])
        .range([padding, width-padding]);

    var yScale = d3.scaleLinear()
        .domain([0.1, 1.1])
        .range([height-padding, padding]);

    var line = d3.line()
        .x(function (d) {
            return xScale(d[0]);
        })
        .y(function (d) {
            return yScale(d[1]);
        });

    // Create the data point circles:
    svg.append("path")
        .datum(handData[id])
        .attr("id", "oldHand")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}
