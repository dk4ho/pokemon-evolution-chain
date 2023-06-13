/**
 * This module interacts with a Pokemon API and retrieves the necessary data.
 */

class PokemonApi {
    /**
    * Constructs a new PokemonApi instance.
    *
    * @param {object} apiClient - The API client used for retrieving evolution chain data.
    */
    constructor(apiClient) {
        
        if (!apiClient) {
            throw new Error("API client is required.");
        }
        this.apiClient = apiClient;

    }

    /**
     * Validates a variable name.
     * @param {string} name - The variable name to be validated.
     * @returns {Boolean} - A boolean value indicating whether the name is valid or not.
     */
    isNameValid(name) {
        return (typeof name === 'string' || name instanceof String) && name.trim().length > 0;
    }

    /**
     * Retrieves the evolution chain for a given Pokemon name.
     * @param {string} name - The name of the Pokemon.
     * @returns {<object|null>} - The evolution chain object for the Pokemon, or null if the resource is not found.
     * @throws {Error} - If name is not valid
     */
    async getEvolutionChain(name) {

        // Check if the name is valid
        if (!this.isNameValid(name)) {
            throw new TypeError('Name should be a non-empty string');
        }

        try {    
            let cleanedName = name.trim().toLowerCase();
        
            let evolutionChainResponse = await this.apiClient.getEvolutionChain(cleanedName);

            return evolutionChainResponse;
        } catch (err) {
            throw new Error(`${err.message}`);
            
        }
    }
}

module.exports = PokemonApi;