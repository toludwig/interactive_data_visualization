function count_all() {
    var counts = [];
    for(var i=0; i<DATA.length; i++){
        var year = +DATA[i].iyear - 2013;
        var month = +DATA[i].imonth;
        var yearmonth = (year * 12) + month;
        if(counts[yearmonth] == undefined){
            counts[yearmonth] = 1;
        } else{
            counts[yearmonth]++;
        }
    }
    return counts;


function count_refugees() {
    var counts = [];
    for(var i=0; i<DATA.length; i++){
        var year = +DATA[i].iyear - 2013;
        var month = +DATA[i].imonth;
        var yearmonth = (year * 12) + month;
        if(DATA[i].target == 7) { // target == Refugees
            if (counts[yearmonth] == undefined) {
                counts[yearmonth] = 1;
            } else {
                counts[yearmonth]++;
            }
        }
    }
    return counts;
}

function draw_lines() {

    var all = count_all();
    var ref = count_refugees();

    console.log(all);
    console.log(ref);

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