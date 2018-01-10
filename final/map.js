function drawMap() {

    // Center Coordinates (ca. Paris) and max. zoom:
    home_lat=50;
    home_long=2;
    home_zoom=4;
    max_zoom=19;


    // Initialise Map at predefined Center ("home"):
    // "zoomControl: false" to avoid the default zoom buttons
    var MAP= L.map('mapid', {zoomControl: false})
        .setView([home_lat, home_long], home_zoom);

    // Now add Zoom button in top-right corner:
    L.control.zoom({position: "topright"}).addTo(MAP);

    // Add Home Button to the map (leads you back to initial map layout):
    L.easyButton('<span>&starf;</span>', function (map) {
        map.setView([home.lat, home.lng], home.zoom);}, 'Zoom To Home')
        .addTo(MAP);


    // Add tile layer to map and the source of the leaflet:
    // Zoom is set to 4-19 so that Europe is displayed nicely.
    // subdomains: "abcd" ??

    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;' +
        '<a href="http://cartodb.com/attributions">CartoDB</a>', maxZoom: max_zoom, minZoom: home_zoom})
        .addTo(MAP);

    //return MAP;
}


function drawPoints() {
    // Initialize the SVG layer
    var svg = d3.select(MAP.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    // adapt Leaflet’s API to fit D3 by implementing a custom geometric transformation


    var circles = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("opacity", .8)
        .style("fill", "red")
        .attr("x", function (d) {
            LatLng = [d.latitude, d.longitude];
            return map.latLngToLayerPoint(LatLng).x;
        })
        .attr("y", function (d) {
            LatLng = [d.latitude, d.longitude];
            return map.latLngToLayerPoint(LatLng).y;
        })
        .attr("r", 5);

    map.on("viewreset", update);

    //update();

    function update() {
        console.log("in");
        circles.attr("transform",
            function (d) {
                LatLng = [d.latitude, d.longitude];
                // console.log(map.latLngToLayerPoint(LatLng));
                return "translate(" +
                    map.latLngToLayerPoint(LatLng).x + "," +
                    map.latLngToLayerPoint(LatLng).y + ")";
            }
        );

        console.log(svg.node().getBBox());
        var xSpan = d3.extent(circles.map(function (t) { return t.x; }));
        var ySpan = d3.extent(circles.map(function (t) { return t.y; }));
        console.log(xSpan);
        var margin = 50;
        svg.attr("width", xSpan[1]-xSpan[0]+margin)
        .attr("height", ySpan[1]-ySpan[0]+margin)
        .attr("left", xSpan[0] +"px")
        .attr("top", ySpan[0] + "px");
    }

    MAP.on("viewreset", update);
    update();
}
