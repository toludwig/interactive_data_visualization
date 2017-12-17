// DRAW POINTS PANEL:
function drawPoints(data) {

    // Select area for points and define layout:
    svg = d3.select("#points");

    width = 800;
    height = 800;
    padding = 80;

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

}



// DRAW HAND PANEL:
function drawHand(id) {
    // Select area for hand drawing
    svg = d3.select("#hand");

    width  = 800;
    height = 800;
    padding = 80;

    var xScale = d3.scaleLinear()
        .domain([0, 1.5])
        .range([padding, width-padding]);

    var yScale = d3.scaleLinear()
        .domain([0, 1.5])
        .range([height-padding, padding]);

    function line(data) {
        return d3.line()
            .x(function (d) {
                console.log(d);
                return d.xs.map(function (x) {
                    return xScale(x);
                });
            })
            .y(function (d) {
                return d.ys.map(function (y) {
                    return yScale(y);
                });
            });
    }

    // Create the data point circles:
    svg.append("path")
        .datum(handData[id])
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 0.5)
        .attr("d", line(handData[id]));

}
