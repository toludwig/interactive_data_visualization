function drawMap() {

    // Center Coordinates (ca. Paris) and max. zoom:
    home_lat=50;
    home_long=2;
    home_zoom=4;
    max_zoom=19;


    // Initialise Map at predefined Center ("home"):
    // "zoomControl: false" to avoid the default zoom buttons
    MAP = L.map('mapid', {zoomControl: false})
        .setView([home_lat, home_long], home_zoom);

    // Now add Zoom button in top-right corner:
    L.control.zoom({position: "topright"}).addTo(MAP);

    // Add Home Button to the map (leads you back to initial map layout):
    L.easyButton('<span>&starf;</span>', function (map) {
        map.setView([home.lat, home.lng], home.zoom);}, 'Zoom To Home').addTo(MAP);


    // Add tile layer to map and the source of the leaflet:
    // Zoom is set to 4-19 so that Europe is displayed nicely.
    // subdomains: "abcd" ??

    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;' +
        '<a href="http://cartodb.com/attributions">CartoDB</a>', maxZoom: max_zoom, minZoom: home_zoom})
        .addTo(MAP);
}


function drawPoints() {
    // Radius
    var radius = 5;
    // Initialize the SVG layer
    var svg = d3.select(MAP.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    // adapt Leaflet’s API to fit D3 by implementing a custom geometric transformation
    var circles = g.selectAll("circle")
        .data(DATA)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("opacity", .8)
        .style("fill", "red")
        .attr("x", function (d) {
            LatLng = [d.latitude, d.longitude];
            return MAP.latLngToLayerPoint(LatLng).x;
        })
        .attr("y", function (d) {
            LatLng = [d.latitude, d.longitude];
            return MAP.latLngToLayerPoint(LatLng).y;
        })
        .attr("r", radius);

    init_tooltips(circles, radius);

    DATA.forEach(function(d) {
        d.LatLng = new L.LatLng( d.latitude, d.longitude)
    });

    var update = function () {
        console.log("in");
        circles.attr("transform",
            function(d) {
                return "translate("+
                    MAP.latLngToLayerPoint(d.LatLng).x +","+
                    MAP.latLngToLayerPoint(d.LatLng).y +")";
            }
        );

        console.log(svg.node().getBBox());
        var bbox = svg.node().getBBox();
        var margin = 50;
        svg.attr("width", bbox.width+margin)
            .attr("height", bbox.height+margin)
            .attr("left", bbox.x+"px")
            .attr("top", bbox.y+"px");

    };

    MAP.on("zoom", update);
    update();
}


function init_tooltips(circles, radius) {
    // Tooltips: Define the div for the tooltip (transparent first, later visible)
    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Tooltips Interactivity:
    circles.on("mouseover", function(d){
        // make selected dot bigger
        d3.select(this).attr("r",radius*2);
        // increase opacity of selected tooltip object (i.e., make visible):
        div.transition()
            .duration(0.01)
            .style("opacity", .95);
        // write out info in a box that is placed in top-right from dot
        div.html("Location: "+ d.city + ", " + d.country_txt + "<br>"
            + "Date: " + d.imonth +"/" + d.iday + "/" + d.iyear + "<br>"
            + "Kind of attack: " + d.attacktype1_txt + "<br>"
            + "No. killed: " + d.nkill)
            .style("left", (d3.event.pageX+ 15) + "px")
            .style("top", (d3.event.pageY - 100) + "px")
    });

    // make dot small again and remove tool tips (visibility):
    circles.on("mouseout", function(d) {
        d3.select(this).attr("r",radius);
        div.transition()
            .duration(0.1)
            .style("opacity", 0);
    });

}
