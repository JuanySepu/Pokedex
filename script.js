const URL = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex");

function showError(mensaje) {
    pokedexContainer.innerHTML = `<p>${mensaje}`;
}

async function searchPokemon() {
    const searchedPokemon = searchInput.value.toLowerCase();

    try {
        const response = await fetch(URL + searchedPokemon);
        
        if (!response.ok) {
            showError(`No se encontró ningún Pokémon llamado: ${searchedPokemon}`);
            return;
        }

        const data = await response.json();

        pokedexContainer.innerHTML = 
        `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}">
            <p>Número: ${data.id}</p>
            <p>Altura: ${data.height / 10}m</p>
            <p>Peso: ${data.weight /10}kg</p>
            <p>Tipo: ${data.types[0].type.name.toUpperCase()}</p>
        `
    } catch (error) {
        console.log(error);
        showError("Ha ocurrido un error al buscar el Pokémon")
    }
}

document.getElementById("btn-search").addEventListener("click", searchPokemon);

