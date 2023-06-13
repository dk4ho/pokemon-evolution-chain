const PokemonApi = require('../');
const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

// Create a mock apiClient for testing
let apiClientMock = {
    getEvolutionChain: sinon.stub().resolves({})
};

let pokemonApi = new PokemonApi(apiClientMock);

describe('getEvolutionChain()', () => {
    
    it('should throw an error for an invalid Pokemon name', async () => {
        const name = '';
        await expect(pokemonApi.getEvolutionChain(name)).to.be.rejectedWith(TypeError, 'Name should be a non-empty string');
    });


    it('should pass the cleaned and lowercase name to the API client', async () => {
        const name = ' Caterpie   ';
        
        await pokemonApi.getEvolutionChain(name);
        expect(apiClientMock.getEvolutionChain).to.have.been.calledOnceWith('caterpie');
    });


    it('should throw an error if the API client throws an error', async () => {
        const name = 'Caterpie';
        const errorMessage = 'API error';
        apiClientMock.getEvolutionChain = () => Promise.reject(new Error(errorMessage));
        await expect(pokemonApi.getEvolutionChain(name)).to.be.rejectedWith(Error, errorMessage);
    });

    

});

