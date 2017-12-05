
// Helper functions

function mean(numbers){
    var sum = 0;
    for(var i=0; i<numbers.length; i++)
        sum += numbers[i];
    return sum / numbers.length;
}

function std(numbers){
    var m = mean(numbers);
    return Math.sqrt(mean(numbers.map(function(x){return Math.pow(x - m, 2)})));
}

function bin_decades(data){
    var bins = [];
    for(var i=0; i<data.length; i += 10){
        var dec  = data[i].YEAR; // 1880s, 1890s, ...
        var tmps = data.slice(i, i + 10).map(function(t){return t.metANN;});
        var m    = mean(tmps);
        var s    = std(tmps);
        bins.push({dec: dec, mean: m, std: s});
    }
    return bins;
}


function makeVis2(bins){
    var svg = d3.select("#plot2");
    var container = svg.append("g");
    var width = parseFloat(svg.node().style.width);
    var height = parseFloat(svg.node().style.height);

    var padding = 60;
    var formatter = d3.format("04");

    var xScale = d3.scaleLinear()
        .domain(d3.extent(bins, function(d){ return d.dec}))
        .range([padding,width-padding]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(bins, function(d){ return d.mean}))
        .range([height-padding, padding]);

    container.selectAll("circle")
        .data(bins)
        .enter()
        .append("circle")
        .attr("r", "2px")
        .attr("cx", function(d){
            return ""+xScale(d.dec)+"px";
        })
        .attr("cy", function(d){
            return ""+yScale(d.mean)+"px";
        });

    container.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3.axisBottom(xScale).tickFormat(formatter));

    container.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .call(d3.axisLeft(yScale));

    var mean_line = d3.line()
        .x(function(d){ return xScale(d.dec); })
        .y(function(d){ return yScale(d.mean); });

    var std_line1 = d3.line()
        .x(function(d){ return xScale(d.dec); })
        .y(function(d){ return yScale(d.mean + d.std); });

    var std_line2 = d3.line()
        .x(function(d){ return xScale(d.dec); })
        .y(function(d){ return yScale(d.mean - d.std); });

    container.append("path")
        .data(bins)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1)
        .attr("d", mean_line);

    container.append("path")
        .data(bins)
        .attr("fill", "#000")
        .attr("stroke", "red")
        .attr("stroke-width", 0.5)
        .attr("d", std_line1);

    container.append("path")
        .data(bins)
        .attr("fill", "#000")
        .attr("stroke", "lightblue")
        .attr("stroke-width", 0.5)
        .attr("d", std_line2);

    container.append("text")
        .attr("fill", "#000")
        .attr("x", 700)
        .attr("y", 300)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text("Decade starting at ...");

    container.append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("x", -40)
        .attr("y", 10)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Temperature (°C)");
}