/**
 * Pokemon Evolution Variations application utilises the PokemonApi module 
 * to interact with a Pokemon API and retrieve the necessary data.
 */

// Import the readline module for reading input from the command line
const readline = require('readline');

// Import the PokemonApi module and apiClient for the PokemonApi
const PokemonApi = require('./modules/pokemon-api');
const apiClient = require('./modules/pokemon-api/apiClients/apiHttpClient.js');

// Create an instance of the PokemonApi using the apiClient
const pokemonApiInstance = new PokemonApi(apiClient);


/**
 * Retrieves the name of the Pokemon from the user via command line input.
 * @returns {Promise<string>} A promise that resolves to the name entered by the user.
 */
const getPokemonNameFromUser = () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Name your pokemon: ', (name) => {
            rl.close();
            resolve(name);
        });
    });
};


/**
 * Retrieves the evolution chain of a Pokemon and logs it to the console.
 * @param {string} name - The name of the Pokemon.
 * @returns {Promise<void>} A promise that resolves once the evolution chain is retrieved and logged.
 */
const printEvolutionChain = async (name) => {
    try {
        const evolutionVariations = await pokemonApiInstance.getEvolutionChain(name);
        console.log(JSON.stringify(evolutionVariations));
    } catch (err) {
        console.error(`An error occurred: ${err.message}`);
    }
};

/**
 * The main entry point of the program.
 * If a Pokemon name is provided as a command line argument, it retrieves and logs the evolution chain.
 * Otherwise, it prompts the user to enter a Pokemon name and then retrieves and logs the evolution chain.
 * @returns {Promise<void>} A promise that resolves once the evolution chain is retrieved and logged.
 */
(async () => {
    const name = process.argv[2] || await getPokemonNameFromUser();
    
    printEvolutionChain(name);
    
})();