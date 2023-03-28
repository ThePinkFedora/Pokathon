
const nav__dropdown = document.querySelector(".nav__dropdown");



elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();

    let search = e.target.search.value;
    let type = e.target.type.value;

    console.log(search,type);

    searchAsync(search,type).then(res=>{
        generateResults(res);
    });
});




// function moveCardToFavorites(card){
//     elements.favorites.appendChild(card);
// }
// function moveCardToResults(card){
//     elements.results.appendChild(card);
// }
