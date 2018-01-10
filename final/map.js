function drawMap() {
    MAP = L.map('map', {
        zoomControl: false
    }).setView([50,2], 4);

    L.control.zoom({
        position:"topright"
    }).addTo(MAP);

    var home = {
        lat: 50,
        lng: 2,
        zoom: 4
    };
    L.easyButton('<span>&starf;</span>',function(btn,map){
        map.setView([home.lat, home.lng], home.zoom);
    },'Zoom To Home')
        .addTo(MAP);

    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;' +
        '<a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 4
    }).addTo(MAP);
}


function drawPoints() {
    /* Initialize the SVG layer */
    var svg = d3.select(MAP.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    var circles = g.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .style("stroke", "black")
        .style("opacity", .6)
        .style("fill", "red")
        .attr("r", 5);


    function update() {
        console.log("in");
        circles.attr("transform",
            function(d) {
                LatLng = [d.latitude, d.longitude];
                return "translate("+
                    map.latLngToLayerPoint(LatLng).x +","+
                    map.latLngToLayerPoint(LatLng).y +")";
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
