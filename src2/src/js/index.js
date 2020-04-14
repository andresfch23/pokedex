import List from './models/List';
import Pokedex from './models/Pokedex';
import * as listView from './views/listView';
import * as pokedexView from './views/pokedexView';
import { elements } from './vars';
import '../css/main.scss';

const state = {};

window.state = state;

const controlList = async () => {
    state.list = new List();

    try {
        await state.list.fetchList();
    
        listView.renderList(state.list.options);
    } catch(error) {
        console.log(error);
    }
};

controlList();

const controlPokedex = e => {
    state.pokedex = new Pokedex();

    state.pokedex.getType(e);

    if (state.pokedex.type) {
        pokedexView.hideDOM();
    
        pokedexView.renderPokedex(state.pokedex.type);

        state.pokedex.fetchInfoPok(state.pokedex.type);

        document.getElementById('pokeInput').addEventListener("keyup", () => pokedexView.optionsList(state.pokedex.pokemons));
        document.getElementById('pokeSearch').addEventListener("click", async () => {
            await state.pokedex.fetchInfoNew();

            if(state.pokedex.infoPokemon.length !== 0) {
                const sprites = state.pokedex.infoPokemon.sprites,
                      images = pokedexView.getImages(sprites);
            
                pokedexView.clearInput();
                pokedexView.deletePokemon();
                pokedexView.addPokemon(images);
                pokedexView.addInfo(state.pokedex.infoPokemon);
                pokedexView.addEvents(images);
            }
        });

        document.querySelector('.head__arrow').addEventListener('click', pokedexView.backList);
    }
};

document.getElementById('list-options').addEventListener('click', e => controlPokedex(e));

