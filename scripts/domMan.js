
const elements = {
    searchForm: document.getElementById("form"),
    results: document.querySelector(".results"),
    favorites: document.querySelector(".favorites"),
    searchField: document.getElementById("searchField"),
    typeSelect: document.getElementById("typeSelect"),
};

function clearResults(){
    elements.results.innerHTML="";
}

function generateResults(pokemonList){
    clearResults();
    for(let p of pokemonList){
        let card = createPokemonCard(p);
        elements.results.appendChild(card);
    }
}

function createPokemonCard(pokemon){
    let card = document.createElement("div");
    card.classList.add("pokemon-card");

    let name = document.createElement("h3");
    name.classList.add("pokemon-card__name");
    name.textContent = pokemon.name;

    let sprite = document.createElement("img");
    sprite.classList.add("pokemon-card__sprite");

    let type = document.createElement("img");
    type.classList.add("pokemon-card__type");

    getValuesAsync(pokemon.name).then(p => {
        sprite.src = p.sprite;
        type.src = getSpriteForType(p.type);
    });

    card.append(name,sprite,type);
    return card;
}

function getSpriteForType(type){
    return `./assets/type/type_${type}.png`;
}