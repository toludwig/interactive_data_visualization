

function drawMap(crimeData) {
    var width = 1000, height = 1000;

    var projection = d3.geoMercator().scale(1).translate([0, 0]).precision(0);
    var path = d3.geoPath().projection(projection);
    var bounds = path.bounds(districts);

    xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
    yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
    scale = xScale < yScale ? xScale : yScale;

    var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];
    projection.scale(scale).translate(transl);

    var svg = d3.select("#map");

    svg.selectAll("path").data(districts.features).enter().append("path").attr("d", path).attr('data-id', function (d) {
        return d.id;
    }).attr('data-name', function (d) {
        return d.properties.name;
    }).style("fill", "#020D1B").style("stroke", "#ffffff");


    // generates colors
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // draw points
    svg.selectAll("circle")
        .data(crimeData)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", 2)
        .style("fill", function (d) {
            return colorScale(d.cat);
        })
        .style("opacity", 0.75);

}