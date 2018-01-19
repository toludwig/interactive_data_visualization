function count_all() {
    var counts = {};
    var i=0;
    for(var y=2013; y<2017; y++)
        for(var m=1; m<13; m++){
            counts[new Date(y, m, 1)] = 0;
            i++;
        }
    for (var i = 0; i < DATA.length; i++) {
        var date = new Date(+DATA[i].iyear, +DATA[i].imonth, 1);
        counts[date]++;
    }
    return counts;
}


function count_refugees() {
    var counts = {};
    var i=0;
    for(var y=2013; y<2017; y++)
        for(var m=1; m<13; m++){
            counts[new Date(y, m, 1)] = 0;
            i++;
        }
    for(var i=0; i<DATA.length; i++){
        if(DATA[i].target == 7) { // target == Refugees
            var date = new Date(+DATA[i].iyear, +DATA[i].imonth, 1);
            counts[date]++;
        }
    }
    return counts;
}

function sort_dict(dict){
    // from stackoverflow: https://stackoverflow.com/a/25500462
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    // Sort the array by key
    items.sort(function(first, second) {
        var date1 = new Date(first[0]);
        var date2 = new Date(second[0]);
        return date1 - date2;
    });
    return items;
}



function drawLines() {

    var all = sort_dict(count_all());
    var ref = sort_dict(count_refugees());

    svg = d3.select("#lineplot");

    var padding = 70;
    var width = 700,
        height = 400;
    var xScale = d3.scaleLinear()
        .domain([new Date(2013, 1, 1), new Date(2017, 1, 1)])
        .range([padding, width-padding]);
    var yScale = d3.scaleLinear()
        .domain([0, 230])
        .range([height-padding, padding]);

    svg.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .attr("class", "axis")
        .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat("%m/%Y")));
    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .attr("class", "axis")
        .call(d3.axisLeft(yScale));

    var line = d3.line()
        .x(function(d) { return xScale(new Date(d[0])); })
        .y(function(d) { return yScale(d[1]); });

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