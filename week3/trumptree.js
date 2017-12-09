function drawtree(data) {
    var margin = {top: 20, right: 120, bottom: 20, left: 20};
    var width = 2000 - margin.right - margin.left;
    var height = 600 - margin.top - margin.bottom;


    //this place the text x axis adjust this to center align the text
    var tx = function (d) {
        return d.x - 3;
    };
    //this place the text y axis adjust this to center align the text
    var ty = function (d) {
        return d.y + 3;
    };


    var tree = d3.tree()
        .size([width, height]);

    var root = d3.hierarchy(data,
        function children(d) {
            if (d["children"] != undefined)
                return d.children;
            else return d.partners;
        });

    var svg = d3.select("#plotarea")
        .attr("width", width + margin.right + margin.left)
        .attr("height", width + margin.top + margin.bottom);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var link = g.selectAll(".link")
        .data(tree(root).links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (link) {
            return "M" + link.source.x + "," + link.source.y
                + "L" + (link.source.x + link.target.x) / 2 + "," + link.source.y
                + " " + link.target.x + "," + link.target.y;
            }
        )
        .attr("fill", "none")
        .attr("stroke", function(link) {
            return (link.source.depth % 2 == 0) ? "red" : "blue";
        })
        .attr("stroke-width", function(link) {
            return (link.source.depth % 2 == 0) ? 4 : 2;
        });


    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append('g')
        .attr("class", function (node) {
            return "node" + (node.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (node) {
            return "translate(" + node.x + "," + node.y + ")";
        });

    node.append("rect")
        .attr("x", -60)
        .attr("y", -15)
        .attr("width", 120)
        .attr("height", 30)
        .style("stroke", "black")
        .style("fill", "white");

    node.append("text")
        .attr('text-anchor', 'middle')
        .text(function (node) {
            return node.data.name;
        });

}
