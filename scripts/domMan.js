

const elements = {
    searchForm: document.getElementById("form"),
    results: document.querySelector(".results__cards"),
    favorites: document.querySelector(".favorites__cards"),
    searchField: document.querySelector(".nav__search-bar"),
    typeSelect: document.querySelector(".nav__dropdown"),
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

function findPokemonCard(name){
    return document.querySelector(`.pokemon-card[data-pokemon='${name}']`);
}

function addToFavorites(pokemonName){
    if(addFavoriteToDataset(pokemonName)){
        let card = findPokemonCard(pokemonName);
        elements.favorites.appendChild(card);
    }
}

function removeFromFavorites(pokemonName){
    if(removeFavoriteFromDataset(pokemonName)){
        let card = findPokemonCard(pokemonName);
        elements.results.appendChild(card);
    }
}

function createPokemonCard(pokemon){

    // card
    let card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.dataset.pokemon = pokemon.name;

    // image div
    let imageDiv = document.createElement('div');
    imageDiv.classList.add("pokemon-card__image-div");
    
    // image itself
    let image = document.createElement('img');
    image.classList.add('pokemon-card__image');

    // info div (h3, p, and icons)
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('pokemon-card__info');

    // name
    let name = document.createElement("h3");
    name.classList.add("pokemon-card__name");
    name.innerText = pokemon.name;

    // type
    let type = document.createElement("img");
    type.classList.add("pokemon-card__type");

    // buttons
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('pokemon-card__button-div');
    
    // add button
    let addButton = document.createElement('img');
    addButton.classList.add('pokemon-card__icon');
    addButton.src = "./assets/icons/icon-like.svg";
    addButton.addEventListener('click',()=>addToFavorites(pokemon.name));

    // remove button
    let removeButton = document.createElement('img');
    removeButton.classList.add('pokemon-card__icon');
    removeButton.src = "./assets/icons/icon-delete.svg";
    removeButton.addEventListener('click',()=>removeFromFavorites(pokemon.name));

    imageDiv.append(image);
    buttonDiv.append(addButton,removeButton);
    infoDiv.append(name,type,buttonDiv);
    card.append(imageDiv,infoDiv);



    getValuesAsync(pokemon.name).then(p => {
        image.src = p.sprite;
        type.src = getSpriteForType(p.type);
    });

    return card;
}

function getSpriteForType(type){
    return `./assets/types/type_${type}.png`;
}

function populateTypeSelect(){
    elements.typeSelect.innerHTML = "";
    let values = ["any",...types];
    for(let type of values){
        let option = document.createElement("option");
        option.value = type;
        option.innerHTML = type;
        elements.typeSelect.appendChild(option);
    }
}

populateTypeSelect();
clearResults();