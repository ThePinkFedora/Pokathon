


searchForm.addEventListener('submit',e=>{
    e.preventDefault();

    let search = e.target.search.value;
    let type = e.target.type.value;

    searchAsync(search,type).then(res=>{
        generateResults(res);
    });
});


document.querySelectorAll(".result__icon--heart").forEach(e => {
    e.addEventListener('click',()=>{

    });
    let pokemon = e.dataset.pokemon;

    let card = e.closest("results__card");

    favoritePokemon.push(pokemon);
    elements.favorites.appendChild(card);
});