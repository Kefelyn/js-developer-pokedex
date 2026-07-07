const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

const modal = document.getElementById('modal');
const closeModal = document.getElementById('fecharModal');

const pokemonDetails = document.getElementById('pokemonDetails');

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}"
        data-number="${pokemon.number}"
        data-name="${pokemon.name}"
        data-photo="${pokemon.photo}"
        data-type="${pokemon.type}"
        data-types="${pokemon.types.join(',')}">

            <span class="number">#${pokemon.number}</span>
            <span class = "name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
            </div>
        </li>
     `
}

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //o join junta os htmls sem separação
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener('click', (event) => {
    const li = event.target.closest('.pokemon');
    if (!li) return;

    const name = li.dataset.name;
    const number = li.dataset.number;
    const photo = li.dataset.photo;
    const type = li.dataset.type;
    const types = li.dataset.types.split(',');

    pokemonDetails.innerHTML = `
    <div class="details ${type}">
        <p class="number">#${number}</p>
        <h2 class="name">${name}</h2>
        <div class="detail">
            <ol class="types">
                ${types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${photo}" alt="${name}">
        </div>
    </div>
`;

    modal.showModal();

});

closeModal.addEventListener('click', () => {
    modal.close();
});

function showPokemonDetails(pokemon) {

}


//------ a parte de cima é tipo uma junção dessa explicação: ------
// const newList = pokemons.map((pokemon) => {
// return convertPokemonToLiHtml(pokemon)})
// const newHtml = newList.join('')
// pokemonList.innerHTML += newList

//------ e principalmente, dessa: ------
//for (let i = 0; i < pokemons.length; i++) {
//const pokemon = pokemons[i];
//pokemonList.innerHTML += convertPokemonToLiHtml(pokemon)}
