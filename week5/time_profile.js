function count(data){
    var counts = [];
    data.forEach(function (d) {
        if(counts[d] == undefined)
            counts[d] = 1;
        else
            counts[d]++;
    });
    // relative counts by dividing absolute frequency by total 10000 * 100 for %
    return counts.map(function (t) { return t/100; });
}

function time_profile(data){
    var data = count(data);
    console.log(data);

    // Scales
    var padding = 70;
    var width = 800,
        height = 400;
    var xScale = d3.scaleLinear()
        .domain([0, 24])
        .range([padding, width-padding]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height-padding, padding]);


    svg = d3.select("#time_profile");
    svg.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3.axisBottom(xScale));
    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .call(d3.axisLeft(yScale));


    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) { return xScale(i); })
        .attr("cy", function (d)    { return yScale(d); })
        .attr("fill", "black")
        .attr("r", 2);


    var line = d3.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d)    { return yScale(d); });


    // line drawing and axis labeling code is copied from:
    // https://bl.ocks.org/mbostock/3883245

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 0.5)
        .attr("d", line);

    svg.append("text")
        .attr("fill", "#000")
        .attr("x", 700)
        .attr("y", 370)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text("Hour");

    svg.append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("x", -80)
        .attr("y", 20)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("percentage of crimes");
}