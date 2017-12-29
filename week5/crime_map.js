
function draw_map(){
    var svg = d3.select('svg');
    var margin = {top: 50, right: 50, bottom: 200, left: 50};
    var width = +svg.node().getBoundingClientRect().width - margin.left - margin.right;
    var height = +svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Choose projection
    var projection = d3.geoKavrayskiy7()
        .scale(width/5)
        .translate([width / 2, height / 2]);

    // Setup path generator
    var path = d3.geoPath()
        .projection(projection);

    d3.json("sf_crime.geojson",
        function(error, data) {
            if (error) throw error;

            g.append("g")
                .selectAll("path")
                .data(topojson.feature(data, data.objects.countries).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "#ccc")
                .attr("stroke", "#aaa")
        });
}