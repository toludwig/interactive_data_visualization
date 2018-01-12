function filter() {
    FILTERED = DATA;

    console.log(FILTER);

    for(var criterion in FILTER){
        var value = FILTER[criterion];
        if(value != "all"){ // Selection: All
            FILTERED = FILTERED.filter(function (d) {
                return d[criterion] == value;
            });
        }
    }

    console.log(FILTERED);

    drawPoints();
}