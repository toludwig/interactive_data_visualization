function filter() {
    FILTERED = clone(DATA);

    console.log(FILTER);

    for (var criterion in FILTER) {
        var value = FILTER[criterion];
        if (value != "all") { // Selection: All
            for (var id=0; id < FILTERED.length; id++) {
                if (FILTERED[id][criterion] != value){
                    FILTERED.splice(id, 1);
                    id--;
                }
            }
        }
    }

    console.log(FILTERED);

    drawPoints();
}


// https://stackoverflow.com/questions/10270711/copy-associative-array-in-javascript
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}
