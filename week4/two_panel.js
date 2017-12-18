// DRAW POINTS PANEL:
function drawPoints(data) {

    // Select area for points and define layout:
    svg = d3.select("#points");

    width = 600;
    height = 600;
    padding = 60;

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
    // Note: We need the outlier/inlier class definitions to later fill those with red colours
    // when the mouse hovers over a specific section of our text.
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


    // Include x-axis (bottom)
    svg.append('g')
        .attr('transform', 'translate(0,' + (height-padding) + ')')
        .attr("class","axis x")
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .attr("class","axis y")
        .call(d3.axisLeft(yScale));

    // x Axis Title:
    svg.append("text")
        .attr("fill","black")
        .attr("x", 550)
        .attr("y", 570)
        .attr("dx", "1px")
        .attr("text-anchor", "end")
        .text("PC 1");

    // y Axis Title:
    svg.append("text")
        .attr("fill", "black")
        .attr("x", 40)
        .attr("y", 70)
        .attr("dy", "1px")
        .attr("text-anchor", "end")
        .text("PC 2");

    // Add main title to left panel visualisation:
    svg.append("text")
        .attr("fill","black")
        .attr("x",350)
        .attr("y",15)
        .attr("font-weight","bold")
        .attr("dy","10px")
        .text("PCA Results");


    // When mouse is on a circle, return ID value to text above panels and initially make circle black:
    circles.on("mousemove", function (d) {
        d3.select('#id_value')
            .text(d.id);
        d3.select(this).style("fill", "black");
        drawHand(d.id);});

    circles.on("mouseout",function(d){
        d3.select(this).style("fill","lightblue")
    });
}


// DRAW HAND PANEL:
function drawHand(id) {

    // Select area for hand drawing
    svg = d3.select("#hand");

    // To avoid hand being drawn on top of each other remove the previous hand:
    d3.select("#oldHand").remove();

    // Layout:
    width  = 600;
    height = 600;
    padding = 60;

    // Scaling:
    var xScale = d3.scaleLinear()
        .domain([0.1, 1.1])
        .range([padding, width-padding]);

    var yScale = d3.scaleLinear()
        .domain([0.1, 1.1])
        .range([height-padding, padding]);


    // Define which values will be used for x and y coordinates to then draw the path:
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
        .attr("stroke", "darkblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Add main title to right panel visualisation:
    svg.append("text")
        .attr("fill","black")
        .attr("x",350)
        .attr("y",15)
        .attr("font-weight","bold")
        .attr("dy","10px")
        .text("Selected Hand");
}
