// DRAW POINTS PANEL:
function drawPoints() {

    // Select area for points and define layout:
    svg = d3.select("#points");

    width = 600;
    height = 600;
    padding = 60;

    // Scaling:
    var xScale = d3.scaleLinear()
        .domain(d3.extent(pointData, function (d) {
            return d.coords[xVar];
        }))
        .range([padding, width - padding]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(pointData, function (d) {
            return d.coords[yVar];
        }))
        .range([height - padding, padding]);

    // Create the data point circles:
    // Note: We need the outlier/inlier class definitions to later fill those with red colours
    // when the mouse hovers over a specific section of our text.
    var circles = svg.selectAll("circle")
        .data(pointData); // UPDATE

    circles.exit() // EXIT
        .remove();

    circles.enter() // ENTER
        .append("circle")
        .merge(circles) // MERGE
        .attr("class", function (d) {
            return (d.id == 37 || d.id == 39) ? "outlier" : "inlier";
        })
        .attr("r", "5")
        .attr("cx", function (d) {
            return "" + xScale(d.coords[xVar]) + "px";
        })
        .attr("cy", function (d) {
            return "" + yScale(d.coords[yVar]) + "px";
        })
        .attr("fill", function (d) {
            return d.id == "0" ? "blue" : "lightblue"; // first selection has id 0
        })
        .attr("stroke", "black");



    // Include x-axis (bottom)
    svg.select('#xAxis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3.axisBottom(xScale));

    svg.select('#yAxis')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(d3.axisLeft(yScale));

    // x Axis Title:
    svg.select("#xLabel")
        .text("PC " + xVar);

    // y Axis Title:
    svg.select("#yLabel")
        .text("PC " + yVar);

    // When mouse is on a circle, return ID value to text above panels and initially make circle black:
    circles.on("mouseover", function (d) {
        d3.select('#id_value')
            .text(d.id);
        d3.selectAll("#points circle")
            .style("fill", "lightblue"); // deselect the old one
        d3.select(this).style("fill", "blue"); // select the new
        drawHand(d.id); // DRAW THE CORRESPONDING HAND);
    });
}


// DRAW HAND PANEL:

function drawHand(id) {

    // Select area for hand drawing
    svg = d3.select("#hand");


    // if One Hand selected in Combo Box:
    // To avoid hands being drawn on top of each other remove the previous hands:
    if (!multiHand){
        svg.selectAll(".oldHand").remove();
    }

    // Layout:
    width  = 600;
    height = 600;
    padding = 60;

    // Scaling:
    var xScale = d3.scaleLinear()
        .domain([0.1, 1.3])
        .range([padding, width-padding]);

    var yScale = d3.scaleLinear()
        .domain([0.1, 1.3])
        .range([height-padding, padding]);

    // Define which values will be used for x and y coordinates to then draw the path:
    var line = d3.line()
        .x(function (d) {
            return xScale(d[0]);
        })
        .y(function (d) {
            return yScale(d[1]);
        });

    // Create the data point hand line:
    var path = svg.append("path")
        .datum(handData[id])
        .attr("class", "oldHand")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1)
        .attr("d", line);


    // Make selected hand red AND MARK DATA POINT IN LEFT PANEL RED:
    // FIXME
    path.on("mousemove", function (d) {
        d3.select(this).attr("stroke", "red").attr("stroke-width", 4);
        d3.select('#id_value')
            .text(d.id);

        // HIER MUSS NOCH REIN DASS LINKS DER ENTSPRECHENDE CIRCLE MARKIERT WIRD, WENN MAN RECHTS EINEN PATH ANKLICKT

    });
    path.on("mouseout", function (d) {
        d3.select(this).attr("stroke", "black").attr("stroke-width", 1);
    });
}
