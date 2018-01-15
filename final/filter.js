function filter() {
    // we have to start with all data (FILTER might be more general than before)
    var selection = DATA.slice(); // so we make a copy (empty splice)
    console.log(DATA);
    

    for (var id=0; id < selection.length; id++) {
        if(!((FILTER.success == "all" || FILTER.success == selection[id].success)
          && (FILTER.attacktype == "all" || FILTER.attacktype == selection[id].attacktype)
          && (FILTER.target == "all" || FILTER.target == selection[id].target)
          && (FILTER.terrorist == "all" || FILTER.terrorist == selection[id].terrorist_grouped)
          && (FILTER.lowerdate == new Date('2013.01.01') || FILTER.lowerdate <= new Date(selection[id].date))
          && (FILTER.upperdate == new Date('2017.01.01') || FILTER.upperdate >= new Date(selection[id].date))
          ))        
        {
            selection.splice(id, 1); // copy the old selection, but leave index id out
            id--;
        }
    }

    console.log(selection);

    return selection;
}