function drawMap(crimeData) {
    var width = 1200, height = 1000;

    var projection = d3.geoMercator().scale(1).translate([0, 0]).precision(0);
    var path = d3.geoPath().projection(projection);
    var bounds = path.bounds(districts);

    xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
    yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
    scale = xScale < yScale ? xScale : yScale;

    var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];
    projection.scale(scale).translate(transl);

    // create map (for now without crimes in it)
    var svg = d3.select("#map");
    svg.selectAll("path")
        .data(districts.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('data-id', function (d) {
            return d.id;
        })
        .attr('data-name', function (d) {
            return d.properties.name;
        })
        .style("fill", "#020D1B")
        .style("stroke", "#ffffff");


    // Draw points:
    radius = 3;

    circles = svg.selectAll("circle")
        .data(crimeData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", radius)
        .style("fill", function (d) {
            return colorScale(CATS.indexOf(d.category));
        })
        .style("opacity", 0.6);


    // Select span where kind of type (selected by hover over circle) will be written:
    //typetext = d3.select("#TypeOfCrime");


    // Tooltips: Define the div for the tooltip (transparent first, later visible)
    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    // OLD INTERACTIVITY:
    // Simple Interactivity: What type of crime?
    // When mouse placed on circle, a) make circle bigger, b) write type of crime in line underneath map,
    // c) make background-colour of written text the same colour as the selected circle:
    //circles.on("mouseover", function (d) {
    //    d3.select(this).attr("r",10);
        // console.log(d.cat);
    //    text = typetext.text(d.category);
    //    text.style("background-color", colorScale(d.cat))
    //});

    // Tooltips Interactivity:
    circles.on("mouseover", function(d){
        // make selected dot bigger
        d3.select(this).attr("r",10);
        // increase opacity of selected tooltip object (i.e., make visible):
        div.transition()
            .duration(0.5)
            .style("opacity", .95);
        // write out category in box that is placed in top-right from dot
        // and colour box in colour of dot:
        div.html(d.category)
            .style("font-weight", "bold")
            .style("left", (d3.event.pageX+5) + "px")
            .style("top", (d3.event.pageY - 40) + "px")
            .style("background-color", colorScale(CATS.indexOf(d.category)));
    });

    // make dot small again and remove tool tips (visibility):
    circles.on("mouseout", function(d) {
        d3.select(this).attr("r",radius);
        div.transition()
                .duration(0.5)
                .style("opacity", 0);
        });
}