const config = {
    production: true,
    productionForBigList: false
};

const axiosConfig = {};

let pokemonList = [];
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
let favoritePokemonList = [];

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

function addFavoriteToDataset(name){
    if( favoritePokemonList.includes(name) )return false;
    favoritePokemonList.push(name);
    return true;
}

function removeFavoriteFromDataset(name){
    let index = favoritePokemonList.indexOf(name);
    if(index>-1){
        favoritePokemonList = favoritePokemonList.filter(p => p!=name);
        
        return true;
    }
    return false;
}

function getAllFavoritePokemon(){
    return favoritePokemonList.map(p => findByName(p));
}


/**
 * 
 * @param {*} limit 
 */
function buildPokemonListAsync(limit=1000){
    return new Promise((resolve,reject)=>{
        let url = (config.production && config.productionForBigList) ? urls.allPokemon : urls.allPokemon_dev
        url += "?limit=" + limit;
        axios.get(url,axiosConfig).then(response => {
            pokemonList = response.data.results.map((element,index) => {
                return {
                    name: element.name,
                    url: element.url,
                    id: index,
                    type: null,
                    sprite: null,
                }
            })

            resolve(pokemonList);
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
        ///If type is any retuurn all
        if(type==="any"){
            resolve(pokemonList);
            return;
        }

        ///If we've queried the type, return the filtered list
        if(queriesTypes.includes(type)){
            resolve(pokemonList.filter(p => p.type === type));
            return;
        }


        queriesTypes.push(type);
        let url = config.production ? urls.byType : urls.byType_dev;
        url = url.replace("%type%",type);

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

// function getTypeAsync(name){
//     return new Promise((resolve,reject)=>{
//         let pokemonObj = findByName(name);
//         if(pokemonObj.type !== null){
//             resolve(pokemonObj.type);
//             return;
//         }

//         let url = config.production ? urls.specificPokemon : urls.specificPokemon_dev;
//         axios.get(url,axiosConfig).then(response => {
//             pokemonObj.sprite = response.data.sprites.front_default;
//             pokemonObj.type = response.data.type[0].type.name;
//             resolve(pokemonObj.type);
//         });
//     });
// }

// function getSpriteAsync(name){
//     return new Promise((resolve,reject) => {
//         let pokemonObj = findByName(name);
//         if(pokemonObj.sprite !== null){
//             resolve(pokemonObj.sprite);
//             return;
//         }

//         let url = config.production ? urls.specificPokemon : urls.specificPokemon_dev;
//         axios.get(url,axiosConfig).then(response => {
//             pokemonObj.sprite = response.data.sprites.front_default;
//             pokemonObj.type = response.data.types[0].type.name;
//             resolve(pokemonObj.sprite);
//         });
//     });
// }

/**
 * 
 * @param {string} name 
 * @returns {Pokemon}
 */
function getValuesAsync(name){
    return new Promise((resolve,reject) => {
        let pokemonObj = findByName(name);
        if(pokemonObj.sprite !== null){
            resolve(pokemonObj.sprite);
            return;
        }

        let url = config.production ? urls.specificPokemon : urls.specificPokemon_dev;
        url = url.replace("%pokemon%",name);
        axios.get(url,axiosConfig).then(response => {
            pokemonObj.sprite = response.data.sprites.front_default;
            pokemonObj.type = response.data.types[0].type.name;
            resolve(pokemonObj);
        });
    });
}

function findByName(name){
    return pokemonList.find(p => p.name === name);
} 

buildPokemonListAsync();





//# Search Methods
/**
 * 
 * @param {string} text 
 * @param {string} type 
 */
function searchAsync(text,type="any"){
    return new Promise((resolve,reject)=>{
        text = text.toLowerCase();

        findAllByTypeAsync(type).then(res => {
            console.log("Res before text filtering: ");
            console.log(res);
            console.log("Res after text filtering: ");
            let filtered = res.filter(e => e.name.includes(text));
            console.log(filtered);
            resolve(filtered);
        });
        // if(type !== "any" && !queriesTypes.includes("any")){
        //     findAllByTypeAsync(type).then(res=>{

        //     });
        // }
        // let results = pokemonList.filter(p=>{
        //     return p.name.includes(text) && (type=="any" || p.type===type);
        // });
    });
}