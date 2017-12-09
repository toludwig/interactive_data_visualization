function drawtree(data) {
    var margin = {top: 20, right: 120, bottom: 20, left: 20};
    var width = 800 - margin.right - margin.left;
    var height = 800 - margin.top - margin.bottom;


    //this place the text x axis adjust this to center align the text
    var tx = function (d) {
        return d.x - 3;
    };
    //this place the text y axis adjust this to center align the text
    var ty = function (d) {
        return d.y + 3;
    };


    var tree = d3.tree()
        .size([height, width]);

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
        .attr("d", function link(d) {
                return "M" + d.source.x + "," + d.source.y
                    + "L" + (d.source.x + d.target.x) / 2 + "," + d.source.y
                    + " " + d.target.x + "," + d.target.y;
            }
        )
        .attr("fill", "none")
        .attr("stroke", "grey");


    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append('g')
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("circle")
        .attr("r", 15)
        .style("fill", "white")
        .style("stroke", "black");

    console.log(data.name);

    node.append("text")
    // FIXME
        .attr('text-anchor', 'middle')
        .text(function (d) {
            return d.data.name;
        });


}
