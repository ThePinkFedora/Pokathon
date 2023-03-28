const config = {
    production: false
};

const axiosConfig = {};

let pokemon = [];
const types = ["normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow"
]
const queriesTypes = [];
const favoritePokemon = [];

/**
 * @typedef Pokemon
 * name
 * url
 * type
 * sprite
 * id
 */

// /?limit=20&offset=20"
const urls = {
    allPokemon: "https://pokeapi.co/api/v2/pokemon/",
    specificPokemon: "https://pokeapi.co/api/v2/pokemon/%pokemon%/",
    byType: "https://pokeapi.co/api/v2/type/%type%/", //

    allPokemon_dev: '../pokemon.json',
    byType_dev: '../grass.json',
    specificPokemon_dev: '../pikachu.json'
    
}

//https://pokeapi.co/api/v2/pokemon/
//pokemon name: data.results[0].name
//pokemon url: data.results[0].url


//https://pokeapi.co/api/v2/pokemon/%pokemon% JSON
//Name: data.name
//Sprite: data.spites.front_default
//types: data.types[0].type.name

//https://pokeapi.co/api/v2/type/%type%/
//Pokemon: data.pokemon[0].pokemon.name

//https://pokeapi.co/api/v2/


axios.get("https://pokeapi.co/api/v2/pokemon/ditto",axiosConfig).then(response => {
    let preElement = document.createElement("pre");
    preElement.innerText = JSON.stringify(response.data, null, 4);
    document.querySelector("body").appendChild(preElement);
});


/**
 * 
 * @param {*} limit 
 */
function buildPokemonListAsync(limit=1000){
    return new Promise((resolve,reject)=>{
        let url = config.production ? urls.allPokemon : urls.allPokemon_dev
        url += "?limit=" + limit;
        axios.get(url,axiosConfig).then(response => {
            pokemon = response.data.results.map((element,index) => {
                return {
                    name: element.name,
                    url: element.url,
                    id: index,
                    type: null,
                    sprite: null,
                }
            })

            resolve(pokemon);
        });
    });
}

/**
 * 
 * @param {string} type 
 * @returns Promise
 */
function findAllByTypeAsync(type){
    return new Promise((resolve, reject)=>{
        ///If we've queried the type, return the filtered list
        if(queriesTypes.includes(type)){
            resolve(pokemon.filter(p => p.type === type));
            return;
        }


        queriesTypes.push(type);
        let url = config.production ? urls.byType : urls.byType_dev;

        axios.get(url,axiosConfig).then(response => {
            let pokemon = response.data.pokemon.filter(p => p.slot===1).map(p => p.pokemon);
            
            let ofType = pokemon.map(p => {
                let pokemonObj = findByName(p.name);
                if(pokemonObj){
                    pokemonObj.type = type;
                    return pokemonObj;
                }else return null;
            }).filter(p => p);
            resolve(ofType);
        });
    });
}

function getSpriteAsync(name){
    return new Promise((resolve,reject) => {
        let pokemonObj = findByName(name);
        if(pokemonObj.sprite !== null){
            resolve(pokemonObj.sprite);
            return;
        }

        let url = config.production ? urls.specificPokemon : urls.specificPokemon_dev;
        axios.get(url,axiosConfig).then(response => {
            pokemonObj.sprite = response.data.sprites.front_default;
            resolve(pokemonObj.sprite);
        });
    });
}

function findByName(name){
    return pokemon.find(p => p.name === name);
} 

buildPokemonListAsync();