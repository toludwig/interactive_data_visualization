


function drawPoints(data) {

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){
            return d[0];
        }))
        .range([0, 800]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){
            return d[1];
        }))
        .range([800, 0]);

    console.log(d3.extent(data, function(d){
            return d[0];
        }))

    var g = d3.select("#points")

    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", "5px")
        .attr("cx", function (d) {
            return yScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("fill", "blue")
        .attr("stroke", "blue");


    g.append('g')
        .attr('transform', 'translate(3,3)')
        .call(d3.axisBottom(xScale));

}

function drawHand(data) {
}