const PokemonApi = require('../');
const { expect } = require('chai');

// Create a mock apiClient for testing
const apiClientMock = {
    getEvolutionChain: () => {}
};

const pokemonApi = new PokemonApi(apiClientMock);

describe('isNameValid()', () => {
    it('should return true for a valid name', () => {
        const name = 'Caterpie';
        const isValid = pokemonApi.isNameValid(name);
        expect(isValid).to.be.true;
    });

    it('should return false for an empty name', () => {
        const name = '';
        const isValid = pokemonApi.isNameValid(name);
        expect(isValid).to.be.false;
    });

    it('should return false for a non-string name', () => {
        const name = 123;
        const isValid = pokemonApi.isNameValid(name);
        expect(isValid).to.be.false;
    });

    it('should return false for a whitespace-only name', () => {
        const name = '    ';
        const isValid = pokemonApi.isNameValid(name);
        expect(isValid).to.be.false;
    });

    it('should return false for a null name', () => {
        const name = null;
        const isValid = pokemonApi.isNameValid(name);
        expect(isValid).to.be.false;
    });
});
