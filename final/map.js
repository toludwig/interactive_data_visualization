function drawMap() {

    // Center Coordinates (ca. Paris) and max. zoom:
    var home_lat=50;
    var home_long=2;
    var home_zoom=4;
    var max_zoom=20;
    var bounds = new L.LatLngBounds(new L.LatLng(70, -40), new L.LatLng(28, 36));


    // Initialise Map at predefined Center ("home"):
    // "zoomControl: false" to avoid the default zoom buttons
    var map = L.map('mapid', {zoomControl: false,
                              maxBounds: bounds,
                              maxBoundsViscosity: 1.0})
        .setView([home_lat, home_long], home_zoom);

    // Now add Zoom button in top-right corner:
    L.control.zoom({position: "topright"}).addTo(map);

    // Add Home Button to the map (leads you back to initial map layout):
    L.easyButton('<span>&starf;</span>', function (map) {
        map.setView([home.lat, home.lng], home.zoom);}, 'Zoom To Home').addTo(map);


    // Add tile layer to map and the source of the leaflet:
    // Zoom is set to 4-19 so that Europe is displayed nicely.
    // subdomains: "abcd" ??

    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;' +
        '<a href="https://cartodb.com/attributions">CartoDB</a>', maxZoom: max_zoom, minZoom: home_zoom})
        .addTo(map);


    // Initialize the SVG layer
    d3.select(map.getPanes().overlayPane).append("svg")
        .append("g").attr("class", "leaflet-zoom-hide")
        .attr("position", "relative");

    return map;
}


function init_tooltips() {
    // Tooltips Interactivity:
    var circles = d3.select("svg g").selectAll("circle");

    var div = d3.select(".tooltip");

    circles.on("mouseover", function(d){
        // Tooltips: Define the div for the tooltip (transparent first, later visible)
        var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip")

        // make selected dot more opaque
        d3.select(this).style("stroke-width", 2);

        // increase opacity of selected tooltip object (i.e., make visible):
        div.transition()
            .duration(0.001)
            .style("opacity", .95);

        // write out info in a box that is placed in top-right from dot
        div.html("Location: " + d.city + ", " + d.country_txt + "<br>"
            +"Date:     " + d.imonth +"/" + d.iday + "/" + d.iyear + "<br>"
            +"Target:     " + targets_array[d.target] + "<br>"
            +"Killed:   " + d.nkill)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 100) + "px")
    });

    // make dot small again and remove tool tips (visibility):
    circles.on("mouseout", function(d) {
        d3.select(this).style("stroke-width", 1);

        d3.select(".tooltip").remove();
    });
}


function on_click_infobox(){
    //
    var circles = d3.select("svg g").selectAll("circle");

    // Infobox Interactivity:
    circles.on("click", function(d){
        // Deselect the previous circle
        d3.select(".selected")
            .style("fill", function(d, i){return colors[d.target]})
            .style("stroke-width", 1)
            .attr("class", null);       // removes the .selected class from it

        // Select the current one
        var circle = d3.select(this).attr("class", "selected");
        blink(circle);

        function blink(circle){
            if(circle.node().classList.contains("selected")) { // only as long as the circle is selected
                d3.select(".selected")
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(600)
                    .style("opacity", 1)
                    .style("fill", "white")
                    .style("stroke", "black")
                    .style("stroke-opacity", 1)
                    .style("stroke-width", 2)
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(600)
                    .style("fill", function (d) {
                        return colors[d.target];
                    })
                    .style("stroke-width", 1)
                    .on("end", function(){blink(circle);}); // repeat for blinking
            }
        };


        // Write infos of selected point in infobox
        var div = d3.select("#infobox div")
            .attr("z-index", 20)
            .attr("position", "absolute")
            .style("overflow-y", "scroll")
            .style("right", "1%")
            .style("bottom", "1%")
            .style("left", "8%");

        div.html("<b>Location:</b> " + d.city + ", " + d.country_txt + "<br>" +
            "<b>Date:</b> " + d.imonth +"/" + d.iday + "/" + d.iyear + "<br>" +
            "<b>Target:</b> " + d.target1 + "<br>" +
            "<b>Perpetrator:</b> " + d.terrorist + "<br>" +
            "<b>Type:</b> " + d.attacktype1_txt + "<br>" +
            "<b>Killed:</b> " + d.nkill + "<br>" +
            "<b>Injured:</b> " + d.nwound + "<br>" +
            "<b>Specific Target:</b> " + d.target1 + "<br>" +
            "<b>Weapon:</b> " + d.weapsubtype1_txt + "<br>" +
            "<br>" +
            "<b>Summary:</b> " +"<br>" + d.summary
        );
    });
}

function init_legend(){
    var svg = d3.select("#circleSize");

    // Build 4 circles for legend: 0, 100, 200, 300 kills
    var circles = [{x:10, y:10, r:0, text:"0 killed"},
        {x:10, y:80, r:10, text:"100 killed"},
        {x:10, y:180, r:100, text:"200 killed"},
        {x:10, y:310, r:200, text:"300 killed"}];
    var width = +svg.node().getBoundingClientRect().width;
    var height = +svg.node().getBoundingClientRect().height;

    var radiusScale = d3.scaleSqrt()
        .domain([0, 300])
        .range([6, 30]);
    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);
    var y = d3.scaleLinear()
        .domain([0, 350])
        .range([10, height-10]);

    svg.selectAll("circle")
        .data(circles)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.x);
        })
        .attr("cy", function (d) {
            return y(d.y);
        })
        .attr("r", function (d){
            return radiusScale(d.r);
        })
        .style("fill", "red")
        .style("border", "1px solid #000");

    svg.selectAll("text")
        .data(circles)
        .enter()
        .append("text")
        .text(function(d){return d.text;})
        .attr("dx", function (d) {
            return x(d.x)+35;
        })
        .attr("dy", function (d) {
            return y(d.y)+4;
        })
        .style("color", "black")
        .attr("fill", "red");
}

function drawPoints(map) {

    // filter() returns the data that are permitted by the filters
    var filtered = filter();

    // Make radius size dependent on the number of killed people:
    var radiusScale = d3.scaleSqrt()
        .domain([0, 300])
        .range([6, 30]);


    var svg = d3.select("svg");
    var g = d3.select("svg g");
    var circles = d3.select("svg g").selectAll("circle")
        .data(filtered)    // UPDATE
        .style("opacity", .85)
        .style("fill", function(d){
            return colors[d.target];
        })
        .style("stroke", "black")
        .attr("r", function(d){
            var killed = ((typeof(d.nkill) == "undefined") || Number.isNaN(d.nkill)) ? 0 : d.nkill;
            return radiusScale(killed);});

    circles.enter()            // ENTER
        .append("circle")
        .style("opacity", .85)
        .style("fill", function(d){
            return colors[d.target];
        })
        .style("stroke", "black")
        .attr("r", function(d){
            var killed = ((typeof(d.nkill) == "undefined") || Number.isNaN(d.nkill)) ? 0 : d.nkill;
            return radiusScale(killed);});

    circles.exit().remove();    // EXIT

    init_tooltips();
    on_click_infobox();

    function zoom_update() {
        g.selectAll("circle")
            .attr("cx", function (d) {
                return map.latLngToLayerPoint(d.LatLng).x;
            })
            .attr("cy", function (d) {
                return map.latLngToLayerPoint(d.LatLng).y;
            });



        var circle_list = g.selectAll("circle").nodes();
        var x_range = d3.extent(circle_list.map(function (c) { return c.cx.baseVal.value; }));
        var y_range = d3.extent(circle_list.map(function (c) { return c.cy.baseVal.value; }));
        var margin = 150;
        svg.attr("width", x_range[1] - x_range[0] + 2*margin)
            .attr("height", y_range[1] - y_range[0] + 2*margin)
            .style("left", x_range[0] - margin +"px")
            .style("top", y_range[0] -margin +"px");
        console.log(DATA);
        g.attr("transform", "translate(" + (-x_range[0] +margin) + "," + (-y_range[0] +margin) + ")");
    }

    // react on zoom
    map.on("zoom", zoom_update);

    // initial zoom
    zoom_update();
}


