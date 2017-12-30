function make_hist(data) {
    var cat_hour = {};
    // The y-Axis variable is to be sorted first
    data.forEach(function(d) {
        if(cat_hour[d.cat] == undefined) // if category not yet there, introduce it
            cat_hour[d.cat] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        cat_hour[d.cat][d.hour]++;
    });

    var layers = [];
    for(var l in cat_hour) {
        layers.push(cat_hour[l].map(function (d, i) {
           return {x: i, y: d};
        }));
    };
    return layers;
}


function stacked_bars(data) {
    var layers = make_hist(data);
    var stack = d3.stack();
    var series = stack(layers);
    console.log(series);

    var padding = 60,
        width = 800,
        height = 400;

    // Scales
    var xScale = d3.scaleLinear()
        .domain([2003, 2015])
        .range([padding,width-padding]);

    var yScale = d3.scaleLinear()
        .domain([0, 150])
        .range([height-padding, padding]);

    var svg = d3.select("#barplot");

    // copied from http://chimera.labs.oreilly.com/books/1230000000345/ch11.html#_stack_layout
    svg.selectAll("rect")
        .data(layers)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return yScale(d.y0);
        })
        .attr("height", function (d) {
            return yScale(d.y);
        })
        .attr("width", xScale.bandwidth());
}
