function drawMap() {
    var mymap = L.map('map', {
        zoomControl: false
    }).setView([50,2], 4);

    L.control.zoom({
        position:"topright"
    }).addTo(mymap);

    var home = {
        lat: 50,
        lng: 2,
        zoom: 4
    };
    L.easyButton('<span>&starf;</span>',function(btn,map){
        map.setView([home.lat, home.lng], home.zoom);
    },'Zoom To Home')
        .addTo(mymap);

    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;' +
        '<a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 4
    }).addTo(mymap);

    return mymap;
}


function drawPoints(map) {
    /* Initialize the SVG layer */
    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    var circles = g.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .style("stroke", "black")
        .style("opacity", .6)
        .style("fill", "red")
        .attr("x", function(d) {
            LatLng = [d.latitude, d.longitude];
            return map.latLngToLayerPoint(LatLng).x;
        })
        .attr("y", function(d) {
            LatLng = [d.latitude, d.longitude];
            return map.latLngToLayerPoint(LatLng).y;
        })
        .attr("r", 20);

    map.on("viewreset", update);
    //update();

    function update() {
        circles.attr("transform",
            function(d) {
                LatLng = [d.latitude, d.longitude];
                console.log(map.latLngToLayerPoint(LatLng));
                return "translate("+
                    map.latLngToLayerPoint(LatLng).x +","+
                    map.latLngToLayerPoint(LatLng).y +")";
            }
        )
    }
}
