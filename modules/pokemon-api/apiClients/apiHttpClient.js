// Base URI for the Pokemon API
const pokemonAPIBaseURI = "https://pokeapi.co/api";

// API version for the Pokemon API
const pokemonAPIVersion = "v2";

// Complete URL for the Pokemon API
const pokemonAPIURL = `${pokemonAPIBaseURI}/${pokemonAPIVersion}`;


const axios = require('axios').default;

/**
 * Fetches the chain URL for a given Pokemon name.
 * @param {string} name - The name of the Pokemon.
 * @returns {Promise<string|null>} - A Promise that resolves to the chain URL, or null if resource for given Pokemon name not found
 * @throws {Error} - If the Pokemon is not found or if there is an error fetching the chain URL.
 */
async function getChainUrl(name) {
    try {
        const response = await axios.get(`${pokemonAPIURL}/pokemon-species/${name}`);
        const { evolution_chain } = response.data;
        
        return evolution_chain.url;
        
    } catch (err) {
        // Returns null if resource for given Pokemon name not found
        if (err.response && err.response.status === 404) {
            return null
        }

        throw new Error(`Failed while fetching the chain URL -> ${err.message}`);
    }
}

/**
 * Fetches the evolution chain from the specified URL.
 * @param {string} chainUrl - The URL to fetch the evolution chain from.
 * @returns {Promise<object|null>} - A Promise that resolves to the evolution chain object, or null if the resource is not found.
 * @throws {Error} - If there is an error fetching the chain.
 */
async function getChain(chainUrl){
    try {
        const response = await axios.get(chainUrl);
        const { chain } = response.data;
        
        return chain;
        
    } catch (err) {
        // Returns null if resource for given chain URL not found
        if (err.response && err.response.status === 404) {
            return null
        }
        throw new Error(`Failed while fetching the chain -> ${err.message}`);
    }
}

/**
 * Traverses the evolution chain and constructs an object representation.
 * @param {object} chain - The evolution chain object.
 * @returns {object} - The object representation of the evolution chain.
 */
function traverseChain(chain) {
    // Create the result object with name and variations
    const result = {
        name: chain.species.name,
        variations: []
    };

    for (let evolevesToObj of chain.evolves_to){
        result.variations.push(traverseChain(evolevesToObj));
    }

    return result;
}

/**
 * Retrieves the evolution chain for a given Pokemon name.
 * @param {string} name - The name of the Pokemon.
 * @returns {Promise<object|null>} - A Promise that resolves to the evolution chain object, or null if the chain for given Pokemon name is not found.
 * @throws {Error} - If there is an error fetching the chain URL or the chain.
 */
async function getEvolutionChain(name) {
    try {
        const chainUrl = await getChainUrl(name);

        if(chainUrl){
            const evolutionChain = await getChain(chainUrl);
            return traverseChain(evolutionChain);
        }

        return null
        
    } catch (err) {
        throw new Error(`Failed retrieve evolution chain for Pokemon "${name}". -> \nError: ${err.message}`);
    }
}

module.exports = {
    getEvolutionChain
}
