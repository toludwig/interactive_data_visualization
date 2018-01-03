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


    // Create 30 colours, since D3 only gives max. of 20:
    colors_30 = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
        "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
        "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#de9ed6", "#ce6dbd", "#a55194",
        "#7b4173", "#e7969c", "#d6616b", "#ad494a", "#843c39", "#e7cb94", "#e7ba52"];

    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

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
            return colorScale(d.cat);
        })
        .style("opacity", 0.6);


    // Select span where kind of type (selected by hover over circle) will be written:
    typetext = d3.select("#TypeOfCrime");


    // Simple Interactivity: What type of crime?
    // When mouse placed on circle, a) make circle bigger, b) write type of crime in line underneath map,
    // c) make background-colour of written text the same colour as the selected circle:
    circles.on("mouseover", function (d) {
        d3.select(this).attr("r",10);
        // console.log(d.cat);
        text = typetext.text(d.category);
        text.style("background-color", colorScale(d.cat))
    });
    // make circle size normal again (radius defined above)
    // and remove written text and background colour of text:
    circles.on("mouseout", function (d) {
        d3.select(this).attr("r",radius);
        text = typetext.text("");
        //text.style("background-color", "white") // not necessary
    });

}