


elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();

    let search = e.target.search.value;
    let type = e.target.type.value;

    searchAsync(search,type).then(res=>{
        generateResults(res);
    });
});


let hearts = document.querySelectorAll(".pokemon-card__icon--heart");
console.log(hearts);
document.querySelectorAll(".pokemon-card__icon--heart").forEach(element => {
    element.addEventListener('click',()=>{
        
        let pokemon = element.dataset.pokemon;

        let card = element.closest(".pokemon-card");

        favoritePokemon.push(pokemon);
        moveCardToFavorites(card);
    });
});

document.querySelectorAll(".pokemon-card__icon--delete").forEach(element => {
    element.addEventListener('click',()=>{
        
        let pokemon = element.dataset.pokemon;

        let card = element.closest(".pokemon-card");

        removeFavorite(pokemon);
        moveCardToResults(card);
    });
});


function moveCardToFavorites(card){
    elements.favorites.appendChild(card);
}
function moveCardToResults(card){
    elements.results.appendChild(card);
}
