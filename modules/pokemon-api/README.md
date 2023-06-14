# Pokemon API Module

This module interacts with a Pokemon API and retrieves the necessary data.

## Usage
To use this module, you need to have an API client that can retrieve evolution chain data from the Pokemon API. The API client is included in the /apiClients directory, but you can replace it with your own implementation if needed, allowing integration of different data sources, such as database-based or files-based storages.


```javascript
// include module in your application
const PokemonApi = require('./PokemonApi');

// Create an instance of the API client
const apiClient = require('./apiClients/apiHttpClient.js');; // include your API client here

// Create a new instance of the PokemonApi using the API client
const pokemonApi = new PokemonApi(apiClient);

// Retrieve the evolution chain for a Pokemon
const evolutionChain = await pokemonApi.getEvolutionChain('charmander');
console.log(evolutionChain);
```

## Class: PokemonApi

The PokemonApi class is responsible for interacting with the Pokemon API and retrieving the necessary data.

### Constructor

**`new PokemonApi(apiClient)`**
Constructs a new `PokemonApi` instance.

* `apiClient` (object): The API client used for retrieving evolution chain data. It should have a `getEvolutionChain` method that accepts a Pokemon name as a parameter and returns the evolution chain object for the Pokemon.

### Methods
**`isNameValid(name)`**
Validates a variable name.

* `name` (string): The variable name to be validated.
* **Returns**: A boolean value indicating whether the name is valid or not.

**`getEvolutionChain`(name)**
-Retrieves the evolution chain for a given Pokemon name.

* `name` (string): The name of the Pokemon.
* **Returns**: The evolution chain object for the Pokemon, or `null` if the resource is not found.
* **Throws**:
  - **TypeError**: If the name is not a valid non-empty string.
  - **Error**: If an error occurs while retrieving the evolution chain.

## Error Handling
By default, this module will print the full stack of errors to trace the cause of any issues. In a real application, it is recommended to utilise a logging framework instead.

## Run Unit Tests

To run the unit tests for the PokemonApi module, follow these steps:

1. Navigate to the directory where the `package.json` file of the PokemonApi module is located.

```shell
cd /path/to/pokemon-api-module
```
2. Install the required dependencies by running the following command:

```shell
npm install
```
3. Once the dependencies are installed, you can run the unit tests using the following command:

```shell
npm run test
```
This will execute the unit tests and display the test results in the console.

**Make sure you have `Node.js` and `npm` installed on your system before running the tests.**

## Custom API Client
You can replace the default API client with your own implementation. Make sure your custom API client has a `getEvolutionChain` method that accepts a Pokemon name as a parameter and returns the evolution chain object for the Pokemon.

```javascript
// Example of a custom API client

function getEvolutionChain(name){
    // Custom implementation to retrieve evolution chain data
}

module.exports = {
    getEvolutionChain
}
```


## License
This module is released under the MIT License.
