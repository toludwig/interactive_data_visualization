function makeVis3(data){
    var svg = d3.select("#plot3");
    var container = svg.append("g");
    var width = parseFloat(svg.node().style.width);
    var height = parseFloat(svg.node().style.height);

    var padding = 60;
    var formatter = d3.format("04");

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){ return d.YEAR}))
        .range([padding,width-padding]);

    var yScale = d3.scaleLinear()
        .domain([7, 12])
        .range([height-padding, padding]);

    container.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "blue")
        .attr("x", function(d){
            return xScale(d.YEAR);
        })
        .attr("y", function(d){
            return yScale(d.metANN);
        })
        .attr("width", "2px")
        .attr("height", function(d){
            return yScale(7) - yScale(d.metANN);
    });

    container.append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3.axisBottom(xScale).tickFormat(formatter));

    container.append('g')
        .attr('transform', 'translate('+padding+', 0)')
        .call(d3.axisLeft(yScale));


    container.append("text")
        .attr("fill", "#000")
        .attr("x", 700)
        .attr("y", 300)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text("Year");

    container.append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("x", -40)
        .attr("y", 10)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Temperature (°C)");
}
