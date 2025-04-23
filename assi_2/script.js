
const searchInput = document.getElementById('pokemon-input');
const searchBtn = document.getElementById('search-btn');
const randomBtn = document.getElementById('random-btn');
const pokemonDataContainer = document.getElementById('pokemon-data');


const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1;  
};


const fetchRandomPokemonData = async () => {
    const pokemonId = getRandomPokemonId();  
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        
        
        displayPokemonData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        pokemonDataContainer.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
    }
};


const fetchPokemonDataByName = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = await response.json();
        
        
        displayPokemonData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        pokemonDataContainer.innerHTML = '<p>Pokémon not found. Please try again.</p>';
    }
};


const displayPokemonData = (pokemon) => {
    const pokemonCard = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="Pokemon Image">
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p>Height: ${pokemon.height / 10} m</p>
            <p>Weight: ${pokemon.weight / 10} kg</p>
        </div>
    `;
    pokemonDataContainer.innerHTML = pokemonCard; 
};

searchBtn.addEventListener('click', () => {
    const pokemonName = searchInput.value.trim();
    if (pokemonName) {
        fetchPokemonDataByName(pokemonName);
    } else {
        alert("Please enter a Pokémon name.");
    }
});

randomBtn.addEventListener('click', fetchRandomPokemonData);
