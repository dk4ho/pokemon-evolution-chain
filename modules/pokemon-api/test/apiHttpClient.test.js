const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const axios = require('axios');
const { getEvolutionChain } = require('../apiClients/apiHttpClient.js');

chai.use(sinonChai);
const expect = chai.expect;

describe('apiHttpClient module', () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return the evolution chain object for a valid Pokemon name', async () => {
    const name = 'caterpie';
    const chainUrl = 'https://pokeapi.co/api/v2/evolution-chain/4';
    const evolutionChain = {
      species: { name: 'caterpie' },
      evolves_to: []
    };

    axiosGetStub.withArgs('https://pokeapi.co/api/v2/pokemon-species/caterpie').resolves({
      data: { evolution_chain: { url: chainUrl } }
    });

    axiosGetStub.withArgs(chainUrl).resolves({
      data: { chain: evolutionChain }
    });

    const result = await getEvolutionChain(name);

    expect(result).to.deep.equal({
      name: 'caterpie',
      variations: []
    });
    expect(axiosGetStub).to.have.been.calledTwice;
    expect(axiosGetStub).to.have.been.calledWith('https://pokeapi.co/api/v2/pokemon-species/caterpie');
    expect(axiosGetStub).to.have.been.calledWith(chainUrl);
  });

  it('should return null for a non-existent Pokemon name', async () => {
    const name = 'nonexistentpokemon';

    axiosGetStub.withArgs('https://pokeapi.co/api/v2/pokemon-species/nonexistentpokemon').rejects({
      response: { status: 404 }
    });

    const result = await getEvolutionChain(name);

    expect(result).to.be.null;
    expect(axiosGetStub).to.have.been.calledOnceWithExactly('https://pokeapi.co/api/v2/pokemon-species/nonexistentpokemon');
  });

  it('should throw an error when there is an error fetching the chain URL', async () => {
    const name = 'pikachu';

    axiosGetStub.withArgs('https://pokeapi.co/api/v2/pokemon-species/pikachu').rejects(new Error('Failed to fetch chain URL'));

    try {
      await getEvolutionChain(name);
    } catch (error) {
      expect(error.message).to.equal('Couldn\'t retrieve evolution chain for Pokemon "pikachu". -> \nError: Failed while fetching the chain URL -> Failed to fetch chain URL');
      expect(axiosGetStub).to.have.been.calledOnceWithExactly('https://pokeapi.co/api/v2/pokemon-species/pikachu');
    }
  });

  it('should throw an error when there is an error fetching the chain', async () => {
    const name = 'pikachu';
    const chainUrl = 'https://pokeapi.co/api/v2/evolution-chain/1';

    axiosGetStub.withArgs('https://pokeapi.co/api/v2/pokemon-species/pikachu').resolves({
      data: { evolution_chain: { url: chainUrl } }
    });

    axiosGetStub.withArgs(chainUrl).rejects(new Error('Failed to fetch chain'));

    try {
      await getEvolutionChain(name);
    } catch (error) {
      expect(error.message).to.equal('Couldn\'t retrieve evolution chain for Pokemon "pikachu". -> \nError: Failed while fetching the chain -> Failed to fetch chain');
      expect(axiosGetStub).to.have.been.calledTwice;
      expect(axiosGetStub).to.have.been.calledWith('https://pokeapi.co/api/v2/pokemon-species/pikachu');
      expect(axiosGetStub).to.have.been.calledWith(chainUrl);
    }
  });
});