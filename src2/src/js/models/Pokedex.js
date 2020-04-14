import { typePokedex, elements } from '../vars';

export default class Pokedex {
    constructor() {
        this.pokemons = [],
        this.type = '',
        this.infoPokemon = []
    }

    getType (e) {
        const type = e.target.dataset.pokType;

        this.type = type;
    }

    async fetchInfoPok(type) {
        try {
            let id = type === typePokedex[0] ? '1' : type === typePokedex[1] ? '2' : '3',
                url = `https://pokeapi.co/api/v2/pokedex/${id}`,
                response = await (await fetch(url)).json(),
                entries = response.pokemon_entries,
                pokemons = entries.map(each => each.pokemon_species.name);

            this.pokemons = pokemons;
                
        } catch(error) {
            console.log(error);
        }     
    }

    async fetchInfoNew () {
        const inputValue = document.getElementById("pokeInput").value;

        try {
            if (inputValue) {
                this.infoPokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)).json();
            }
        } catch(error){
            console.log(error);
        }
    }
}