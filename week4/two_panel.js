// WESENTLICHE ÄNDERUNG: PUNKTE ANZEIGEN LASSEN DURCH KLICK

// DRAW POINTS PANEL:
function drawPoints(data) {

    // Select area for points and define layout:
    g = d3.select("#points");

    width = 800;
    height = 800;
    padding = 80;

    // SCALING
    // Fehler: die Punkte stimmen nicht mit den eigentlichen Ranges und Achsen überein:
    // range of x-axis, i.e. data[0] = -0.4899838 to 0.6225203
    // range of y-axis, i.e. data[1] = -0.4273515 to 0.4657887

    // Print out min and max of first and second row's data values:
    console.log(d3.extent(data, function(d){
        return d[0];
    }));

    console.log(d3.extent(data, function(d){
        return d[1];
    }));




    // Scaling:
     var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){
            return d[0];
        }))
        .range([padding, width-padding]);

     var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){
            return d[1];
        }))
        .range([height-padding, padding]);




    // Create the data point circles:
    var circles = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", "5")
        .attr("cx", function (d) {
            return ""+ yScale(d[0]) +"px";})
        .attr("cy", function (d) {
            return ""+ yScale(d[1]) +"px";})
        .attr("fill", "lightblue")
        .attr("stroke", "black");


    // Check the values by clicking on the circles:

    circles.on("click", function (d) {
            d3.select('#x_value')
                .text(d[0]);
            d3.select('#y_value')
                .text(d[1]);});



    // Include x-axis (bottom)
    g.append('g')
        .attr('transform', 'translate(0,' + (height-padding) + ')')
        .attr("class","axis x")
        .call(d3.axisBottom(xScale));

    g.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .attr("class","axis y")
        .call(d3.axisLeft(yScale));

}



// DRAW HAND PANEL:
function drawHand(data) {
}
