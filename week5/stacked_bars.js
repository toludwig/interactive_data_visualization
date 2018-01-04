function make_hist(data) {
    var hour_cat = [];
    for(var h=0; h<24; h++) {
        hour_cat[h] = {};
        CATS.forEach(function (cat) {
            hour_cat[h][cat] = 0;
        });
    }

    data.forEach(function(d) {
        hour_cat[d.hour][d.cat]++;
    });

    return hour_cat;
}


// the following is mostly copied from
// https://github.com/alignedleft/d3-book/blob/master/chapter_13/03_stacked_bar.html
function stacked_bars(data) {
    var layers = make_hist(data);
    var stack = d3.stack().keys(CATS);
    var series = stack(layers);

    var padding = 60,
        width = 800,
        height = 500;

    // Scales
    var xScale = d3.scaleBand()
        .domain(d3.range(24))
        .range([padding, width-padding])
        .paddingInner(0.05);

    var yScale = d3.scaleLinear()
        .domain([0, 650]) // the following code was used to get the max stack height
    // d3.max(layers, function(stack) {
    //         var sum = 0;
    //         for(var bar in stack)
    //             sum += stack[bar];
    //         return sum;
    //     })])
        .range([height-padding, padding]);


    var svg = d3.select("#barplot");
    svg.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3.axisBottom(xScale));
    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .call(d3.axisLeft(yScale));


    // Add a group for each row of data
    var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
            return colors(i);
        });


    var rects = groups.selectAll("rect")
        .data(function(d) { console.log(d); return d; })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            console.log(xScale(i));
            return xScale(i);
        })
        .attr("y", function (d) {
            return yScale(d[0]);
        })
        .attr("height", function(d) {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth());

}
