function drawtree(data) {
    var margin = {top: 20, right: 100, bottom: 10, left: 10};
    var width = 1700 - margin.right - margin.left;
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


    // Create rectangles which will be placed behind the names:
    // note:x=-50 needed so that the rectangles will be placed in the center, not pushed to right from node
    node.append("rect")
        .attr("x", -50)
        .attr("y", -20)
        .attr("width", 100)
        .attr("height", 30)
        .style("stroke", "black")
        .style("fill", "white");


    // add the person's name to node:
    var text = node.append("text")
        .attr('text-anchor', 'middle')
        .text(function (node) {
            return node.data.name;
        });


    // add interactivity (Who is your favourite Trump family member?):
    text.on("mousemove", function (d) {
        // print name:
        d3.select('#event-text')
            .text(d.data.name);
        // print that person's age:
        d3.select("#event-age")
            .text(d.data.age);
        // make the text within chosen rectangle green:
        d3.select(this).style("fill", "limegreen").attr("font-weight", "bold");

    })
        .on("mouseout", function (d) {
            // print text to appear between choices:
            d3.select('#event-text')
                .text("Hmm, such a hard decision...");
            // remove previous person's age:
            d3.select("#event-age")
                .text("__");
            // make the text within previously chosen rectangle black again:
            d3.select(this).style("fill", "black").attr("font-weight", "normal");
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
            });

}
