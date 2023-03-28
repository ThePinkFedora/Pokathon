

const elements = {
    searchForm: document.getElementById("form"),
    results: document.querySelector(".results__cards"),
    favorites: document.querySelector(".favorites__cards"),
    searchField: document.querySelector(".nav__search-bar"),
    typeSelect: document.getElementById(".nav__dropdown"),
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

    // card
    let card = document.createElement("div");
    card.classList.add("pokemon-card");

    // image div
    let imageDiv = document.createElement('div');
    imageDiv.classList.add("pokemon-card__image-div");
    image.setAttribute('src', '????')
    
    // image itself
    let image = document.createElement('img');
    image.classList.add('pokemon-card__image');

    // info div (h3, p, and icons)
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('pokemon-card__info');

    // name
    let name = document.createElement("h3");
    name.classList.add("pokemon-card__name");
    //name.textContent = pokemon.name;

    // type
    let type = document.createElement("img");
    type.classList.add("pokemon-card__type");

    // buttons
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('pokemon-card__button-div');
    
    // add button
    let addButton = document.createElement('img');
    addButton.classList.add('pokemon-card__icon');

    // remove button
    let removeButton = document.createElement('img');
    removeButton.classList.add('pokemon-card__icon');






    getValuesAsync(pokemon.name).then(p => {
        sprite.src = p.sprite;
        type.src = getSpriteForType(p.type);
    });

    // card.append(name,sprite,type);
    // return card;
}

function getSpriteForType(type){
    return `./assets/type/type_${type}.png`;
}