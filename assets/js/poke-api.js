const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    //offset é a posição inicial, pula a quantidade de itens anteriores.
    //limit é a quantidade máxima de itens por página.

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //o Fetch retorna uma promise, que ajuda a lidar com o assincronismo. 
    return fetch(url)
        //"then" o fetch der certo, a function será chamada.
        .then((response) => response.json())
        //esse segundo then recebe o retorno primeiro then.
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        //caso dê algum erro, chama o catch.
        .catch((error) => console.error(error))
    //independente do sucesso ou do fracasso, vai chamar o finally.
    //.finally(() => console.log("Requisição concluída!"))
}

