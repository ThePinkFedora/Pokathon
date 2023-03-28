


elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();

    let search = e.target.search.value;
    let type = e.target.type.value;

    searchAsync(search,type).then(res=>{
        generateResults(res);
    });
});


document.querySelectorAll(".result__icon--heart").forEach(element => {
    element.addEventListener('click',()=>{
        let pokemon = element.dataset.pokemon;

        let card = element.closest("results__card");

        favoritePokemon.push(pokemon);
        elements.favorites.appendChild(card);
    });
});