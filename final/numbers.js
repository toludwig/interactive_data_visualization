function count_all() {
    var counts = [];
    for(var i=0; i<49; i++)
        counts[i] = 0;
    for (var i = 0; i < DATA.length; i++) {
        var year = +DATA[i].iyear - 2013;
        var month = +DATA[i].imonth;
        var yearmonth = (year * 12) + month;
        counts[yearmonth]++;
    }
    return counts;
}


function count_refugees() {
    var counts = [];
    for(var i=0; i<49; i++)
        counts[i] = 0;
    for(var i=0; i<DATA.length; i++){
        var year = +DATA[i].iyear - 2013;
        var month = +DATA[i].imonth;
        var yearmonth = (year * 12) + month;
        if(DATA[i].target == 7) { // target == Refugees
            counts[yearmonth]++;
        }
    }
    return counts;
}



function drawLines() {

    var all = count_all();
    var ref = count_refugees();

    console.log(all);
    console.log(ref);

    svg = d3.select("#lineplot");

    var padding = 70;
    var width = 700,
        height = 400;
    var xScale = d3.scaleLinear()
        .domain([0, 48])
        .range([padding, width-padding]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(all)])
        .range([height-padding, padding]);

    svg.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .attr("class", "axis")
        .call(d3.axisBottom(xScale).ticks(24));
    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .attr("class", "axis")
        .call(d3.axisLeft(yScale));

    var line = d3.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d)    { return yScale(d); });

    svg.append("path")
        .datum(all)
        .attr("fill", "none")
        .attr("stroke", "#dddddd")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("path")
        .datum(ref)
        .attr("fill", "none")
        .attr("stroke", "#f3614d")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);


    svg.append("text")
        .attr("fill", "white")
        .attr("x", 630)
        .attr("y", 380)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text("time");

    svg.append("text")
        .attr("fill", "white")
        .attr("transform", "rotate(-90)")
        .attr("x", -70)
        .attr("y", 10)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("number of attacks");


    svg.append("text")
        .attr("fill", "#dddddd")
        .attr("x", 610)
        .attr("y", 100)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("total");

    svg.append("text")
        .attr("fill", "#f3614d")
        .attr("x", 600)
        .attr("y", 130)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text("refugee-related");

}