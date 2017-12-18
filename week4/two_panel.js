// WESENTLICHE ÄNDERUNG: PUNKTE ANZEIGEN LASSEN DURCH KLICK

// DRAW POINTS PANEL:
function drawPoints(data) {

    // Select area for points and define layout:
    g = d3.select("#points");

    width = 800;
    height = 800;
    padding = 80;


    // SCALING

    // Print out min and max of first and second row's data values:
    // console.log(d3.extent(data, function(d){return d[0];})); //-0.4899838 to 0.6225203 (x-Axis)
    // console.log(d3.extent(data, function(d){return d[1];})); //-0.4273515 to 0.4657887 (y-Axis)

    // alternative: domain based on data range:
    //       .domain(d3.extent(data, function(d){return d[0]}))
    //       .domain(d3.extent(data, function(d){return d[1];}))
    // but then the axis are a little shorter

    var xScale = d3.scaleLinear()
        .domain([-0.5, 0.7])
        .range([padding, width - padding]);

    var yScale = d3.scaleLinear()
        .domain([-0.5, 0.5])
        .range([height - padding, padding]);


    // Create the data point circles:
    var circles = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", "5")
        .attr("cx", function (d) {
            return "" + xScale(d[0]) + "px";
        })
        .attr("cy", function (d) {
            return "" + yScale(d[1]) + "px";
        })
        .attr("fill", "lightblue")
        .attr("stroke", "black");


    // Interactivity: Check the values by clicking on the circles:
    circles.on("click", function (d) {
        d3.select('#x_value')
            .text(d[0]);
        d3.select('#y_value')
            .text(d[1]);
    });


    // Include axis and axis titles:
    g.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .attr("class", "axis x")
        .call(d3.axisBottom(xScale));

    g.append('g')
        .attr('transform', 'translate(' + padding + ', 0)')
        .attr("class", "axis y")
        .call(d3.axisLeft(yScale));

    // x Axis:
    g.append("text")
        .attr("fill","black")
        .attr("x", 750)
        .attr("y", 770)
        .attr("dx", "1px")
        .attr("text-anchor", "end")
        .text("PC 1");

    // y Axis:
    g.append("text")
        .attr("fill", "black")
        .attr("x", 40)
        .attr("y", 80)
        .attr("dy", "1px")
        .attr("text-anchor", "end")
        .text("PC 2");

    // Add title to left panel visualisation:
    g.append("text")
        .attr("fill","black")
        .attr("x",400)
        .attr("y",50)
        .attr("dy","1px")
        .text("PCA Results");

}


// DRAW HAND PANEL:
function drawHand(data) {

    g = d3.select("#points");
    width = 800;
    height = 800;
    padding = 80;

    // SCALING
    var xScale = d3.scaleLinear()
        .domain([0.1,1.3])
        .range([padding, width - padding]);

    var yScale = d3.scaleLinear()
        .domain([0.1,1.3])
        .range([height - padding, padding]);

}
