


searchForm.addEventListener('submit',e=>{
    e.preventDefault();

    let search = e.target.search.value;
    let type = e.target.type.value;

    searchAsync(search,type).then(res=>{
        generateResults(res);
    });
});