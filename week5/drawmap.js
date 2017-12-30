function drawMap(crimeData) {

    var width = 800, height = 800;

    var svg = d3.select("#map")
        .attr("width", width)
        .attr("height", height);

    //var projection = d3.geo.albersUsa()
    //    .translate([w / 2, h / 2])
    //    .scale([500]);

    var projection = d3.geoMercator().scale(1).translate([0, 0]).precision(0);
    var path = d3.geoPath().projection(projection);
    var bounds = path.bounds(districts);

    xScale = (width-200) / Math.abs(bounds[1][0] - bounds[0][0]);
    yScale = (height-200) / Math.abs(bounds[1][1] - bounds[0][1]);
    scale = xScale < yScale ? xScale : yScale;

    var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
        (height - scale * (bounds[1][1] + bounds[0][1])) / 2];


    projection.scale(scale).translate(transl);

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
        .style("fill", "#d9d9d9")
        .style("stroke", "#020D1B");


    svg.selectAll("circle")
        .data(crimeData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", 2)
        .style("fill", "darkred")
        .style("opacity", 0.6);
}