# Pokemon Evolution Chain

This application allows users to retrieve and log the evolution chain of a Pokemon. It utilises the [PokemonApi](modules/pokemon-api/README.md) module to interact with a Pokemon API and retrieve the necessary data.

## Table of contents

* [Application details](#application-details)
* [How to Run](#how-to-run)
* [Examples](#examples)

## Application details
The application follows these main steps

1. Imports the necessary modules, including the [PokemonApi](modules/pokemon-api/README.md) module and the apiClient for the PokemonApi.

2. Creates an instance of the PokemonApi using the apiClient.

3. Defines a function, `getPokemonNameFromUser`, that prompts the user to enter the name of a Pokemon via command line input. It returns a Promise that resolves to the name entered by the user.

4. Defines a function, `printEvolutionChain`, that takes a Pokemon name as input. It retrieves the evolution chain of the Pokemon using the getEvolutionChain method from the PokemonApi and logs the result to the console. If an error occurs, it logs the error message to the console.

5. Defines the main entry point of the program as an asynchronous IIFE. It checks if a Pokemon name is provided as a command line argument. If a name is provided, it directly retrieves and logs the evolution chain. Otherwise, it prompts the user to enter a Pokemon name and then retrieves and logs the evolution chain based on the user's input.

The application allows users to either provide a Pokemon name as a command line argument or interactively enter a name when prompted. The evolution chain of the specified Pokemon is then retrieved and logged to the console.

## How to Run

1. Ensure you have Node.js installed on your system. You can download it from [Node.js](https://nodejs.org/) official website.

    You can check if you have it installed by runing command in terminal or command prompt.
    ```bash
    node -v
    ```

2. Open a terminal or command prompt.

3. Navigate to the directory where the main application file `app.js` is located.

4. Run the following command to install the required dependencies:

```bash
npm install
```
This command will install all the necessary dependencies specified in the `package.json` file.

5. Once the dependencies are installed, you can run the application using the following command:

```bash
node app.js [pokemonName]
```

Replace `[pokemonName]` with the name of the Pokemon you want to retrieve the evolution chain for. If no Pokemon name is provided, the application will prompt you to enter a name interactively.


## Examples
To retrieve and log the evolution chain for a specific Pokemon, run:

```bash
node app.js Caterpie
```
This command will fetch the evolution chain for the Pokemon "Caterpie" and display it in the console.

To interactively enter a Pokemon name, run:

```bash
node app.js
```
The application will prompt you to enter a Pokemon name. After entering the name, it will retrieve and log the evolution chain for the specified Pokemon.

Make sure to replace Caterpie with the actual name of the Pokemon you want to retrieve the evolution chain for.

## License
This module is released under the MIT License.
