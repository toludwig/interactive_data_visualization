function make_hist(data) {
    var year_cat_hist = { // hardcoded years
        2003 : {}, 2004 : {}, 2005 : {}, 2006 : {},
        2007 : {}, 2008 : {}, 2009 : {}, 2010 : {},
        2011 : {}, 2012 : {}, 2013 : {}, 2014 : {}, 2015 : {}
    };
    data.forEach(function(d) {
        if(year_cat_hist[d.year][d.category] == undefined){
            // if category in that year not yet there, introduce it
            year_cat_hist[d.year][d.category] = 1;
        } else{
            // if there already, increment
            year_cat_hist[d.year][d.category]++;
        }
    });

    // TODO var layers =

    return year_cat_hist;
}


function stacked_bars(data) {
    var hist = make_hist(data);

    // Scales
    var xScale = d3.scaleLinear()
        .domain([2003, 2015])
        .range([padding,width-padding]);

    var yScale = d3.scaleLinear()
        .domain([0, 150])
        .range([height-padding, padding]);

    var stack = d3.layout.stack(hist);

    d3.select("#barplot")
        .data(hist)
        .append("rect")
        .attr("height", function (d) {
            return 0; // TODO
        });

    // copied from http://chimera.labs.oreilly.com/books/1230000000345/ch11.html#_stack_layout
    var rects = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return yScale(d.y0);
        })
        .attr("height", function (d) {
            return yScale(d.y);
        })
        .attr("width", xScale.rangeBand());
}
