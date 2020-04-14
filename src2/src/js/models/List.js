import { typePokedex } from '../vars';

export default class List {
    constructor() {
        this.options = []
    }

    async fetchList () {
        try {
            const response = await (await fetch(`https://pokeapi.co/api/v2/pokedex`)).json();

            response.results.forEach(each => {
                 typePokedex.forEach(pok => {
                     if (pok === each.name) {
                        this.options.push(each);
                     }
                 });
            });
            
        } catch(error) {
            console.log(error);
        }
    }
}
