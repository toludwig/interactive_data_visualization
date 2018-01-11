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

    data.forEach(function(d) {
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
    }

    MAP.on("viewreset", update);
    update();
}
