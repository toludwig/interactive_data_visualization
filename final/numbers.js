function count_all() {
    var months = [];
    for(var i=0; i<DATA.length; i++){
        var year = DATA[i].iyear - 2013;
        var month = DATA[i].imonth;
        var yearmonth = (year * 12) + month;
        //console.log(yearmonth);
        //counts[]
    }


    // NOTE just temporal code ---------------------------
    // for counting of terrorists
    // var targets = DATA.map(function(d){return d.target;});
    // var t_dict = {};
    // for(var i=0; i < targets.length; i++) {
    //     var value = targets[i];
    //     if (t_dict[value] == undefined)
    //         t_dict[value] = 1;
    //     else
    //         t_dict[value]++;
    // }
    // console.log(t_dict);
    //
    // var items = Object.keys(t_dict).map(function(key) {
    //     return [key, t_dict[key]];
    // });
    // items.sort(function(first, second) {
    //     return second[1] - first[1];
    // });
    //
    //
    // console.log(items);
    // console.log(targets_array);
    //--------------------------------------------------
}

function count_refugees() {

}

function draw_lines() {

    var all = count_all();
    var ref = count_refugees();

    var padding = 70;
    var width = 800,
        height = 400;
    var xScale = d3.scaleLinear()
        .domain([0, 48])
        .range([padding, width-padding]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height-padding, padding]);


    svg = d3.select("#lineplot");
    svg.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3.axisBottom(xScale));
    svg.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .call(d3.axisLeft(yScale));

    var line = d3.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d)    { return yScale(d); });

    svg.append(path)
        .datum(all)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 0.8)
        .attr("d", line);

    svg.append(path)
        .datum(ref)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 0.8)
        .attr("d", line);
}