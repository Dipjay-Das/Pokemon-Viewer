
const pkDetails = document.getElementById('pk-info');
const pkName = document.getElementById('pk-name');
const pkSprite = document.getElementById('pk-img');
const pkTypes = document.getElementById('pk-types');



const URL = "https://pokeapi.co/api/v2/pokemon?limit=10"
async function fetchPokemonData() {
    let response = await fetch(URL);
    let data = await response.json();
    return data.results;

}

async function fetchPokemonInfo(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displaylistInfo() {
    const pokemonList = await fetchPokemonData();
    const listBox = document.getElementById('pk-list');

    pokemonList.forEach(async (pokemon) => {
        const listElem = document.createElement('li');
        listElem.textContent = pokemon.name;
        listElem.addEventListener("click", async () => {
            const pokemonInfo = await fetchPokemonInfo(pokemon.url);
            console.log(pokemonInfo)
            displayPokemonDetails(pokemonInfo);
        });
        listBox.append(listElem);

    });


}

async function displayPokemonDetails(pokemonInfo) {
    pkSprite.src = pokemonInfo.sprites.front_shiny;
    pkName.textContent = pokemonInfo.name;
    pkTypes.textContent = `Type: ${pokemonInfo.types.map(type => type.type.name).join(', ')}`;

    pkDetails.style.display = 'block';
    console.log("please display pokemon details")
}

function searchFunction() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const pokemonListItems = document.querySelectorAll('#pk-list li');

    pokemonListItems.forEach((item) => {
        const pokemonName = item.textContent.toLowerCase();
        if (pokemonName.includes(searchValue)) {
            item.style.display = 'inline-block';
        } else {
            item.style.display = 'none';
        }
    });
}
displaylistInfo()






