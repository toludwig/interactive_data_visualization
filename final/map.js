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
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 4
    }).addTo(mymap);
}


function drawPoints() {

}
