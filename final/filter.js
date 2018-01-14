function filter() {
    // we have to start with all data (FILTER might be more general than before)
    var selection = DATA.slice(); // so we make a copy (empty splice)

    for (var id=0; id < DATA.length; id++) {
        if(!((FILTER.success == "all" || FILTER.success == selection[id].success)
          && (FILTER.attacktype == "all" || FILTER.attacktype == selection[id].attacktype)
          && (FILTER.target == "all" || FILTER.target == selection[id].target)))
        {
            selection = selection.splice(id, 1); // copy the old selection, but leave index id out
        }
    }

    console.log(selection);
    return selection;
}
