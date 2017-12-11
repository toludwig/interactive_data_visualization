function drawtree(data) {
    var margin = {top: 20, right: 10, bottom: 10, left: 10};
    var width = 2000 - margin.right - margin.left;
    var height = 600 - margin.top - margin.bottom;


    var tree = d3.tree()
        .size([width, height]);

    // Partners will be treated as children for graph (simplification):
    var root = d3.hierarchy(data,
        function children(d) {
            if (d["children"] != undefined)
                return d.children;
            else return d.partners;
        });

    // Create Plot Area and Group element:
    var svg = d3.select("#plotarea")
        .attr("width", width + margin.right + margin.left)
        .attr("height", width + margin.top + margin.bottom);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Create Links
    // note: every second layer will have different colour and line depth
    // i.e., red=partnership/marriage, blue=parent/child relationship:
    var link = g.selectAll(".link")
        .data(tree(root).links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function (link) {
                return "M" + link.source.x + "," + link.source.y
                    + "L" + (link.source.x + link.target.x) / 2 + "," + link.source.y
                    + " " + link.target.x + "," + link.target.y;
            }
        )
        .attr("fill", "none")
        .attr("stroke", function (link) {
            return (link.source.depth % 2 == 0) ? "red" : "blue";
        })
        .attr("stroke-width", function (link) {
            return (link.source.depth % 2 == 0) ? 3 : 3;
        });


    // Create nodes:
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


    // Create rectangles which will later be placed behind the names:
    // note:x=-60 needed so that the rectangles will be placed in the center, not pushed to right from node
    node.append("rect")
        .attr("x", -60)
        .attr("y", -20)
        .attr("width", 120)
        .attr("height", 30)
        .style("stroke", "black")
        .style("fill", "white");

    // add the person's name to node:
    node.append("text")
        .attr('text-anchor', 'middle')
        .text(function (node) {
            return node.data.name;
        });

    // add colours to legend table:
    d3.select("table")
        .selectAll("td")
        .style("color",
            function (d) {
                if (this.innerText == "Husband/Wife")
                    return "red";
                else
                    return "blue";
            })
}
