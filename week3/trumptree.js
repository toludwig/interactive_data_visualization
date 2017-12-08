function drawtree(data){
    d3.select("#plotarea")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 20);
