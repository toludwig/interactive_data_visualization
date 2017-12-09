

function drawtree(data){
    var margin = {top: 20, right: 120, bottom:20, left: 20};
    var width = 960 - margin.right - margin.left;
    var height = 500 - margin.top - margin.bottom;

    var tree = d3.tree()
        .size([height, width]);

    var root = d3.hierarchy(data,
        function children(d){
            if(d["children"] != undefined)
                return d.children;
            else return d.partners;
        });

    var svg = d3.select("#plotarea")
        .attr("width", width + margin.right + margin.left)
        .attr("height", width + margin.top + margin.bottom)
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var link = g.selectAll(".link")
        .data(tree(root).links())
        .enter().append("path")
        // TODO schönere Links
        // TODO alle Links!!
        .attr("class", "link")
        .attr("d", function(d){
                d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; });
            }
            // function link(d) {
            //     return
            //     "M" + d.source.y + "," + d.source.x
            //         + "C" + (d.source.y + d.target.y)  + "," + d.source.x
            //         + " " + (d.source.y + d.target.y)  + "," + d.target.x
            //         + " " + d.target.y + "," + d.target.x;
            // }
        );

            //d3.linkHorizontal()
            //.x(function(d) { return d.x; })
            //.y(function(d) { return d.y; }));

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

    node.append("circle")
        .attr("r", 10)
        .style("fill", "none")
        .style("stroke", "red");

    node.append("text")
        // FIXME
        .text(function(d) { return d["name"]; });
}
