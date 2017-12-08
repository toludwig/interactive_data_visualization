

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
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(function(d) { return d.y; })
            .y(function(d) { return d.x; }));

    tree.nodes();

}
