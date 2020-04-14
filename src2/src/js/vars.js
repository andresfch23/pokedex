const national = 'national',
      kanto = 'kanto',
      johto = 'original-johto';

export const typePokedex = [national, kanto, johto];

export const elements = {
    listOptions: document.querySelector('#list-options'),
    list: document.querySelector('.list'),
    header: document.querySelector('#header'),
    listPokemon: document.querySelector('#listPokemon'),
    body: document.querySelector('body'),
    pokeSearch: document.querySelector('#pokeSearch'),
    pokeInput : document.querySelector('#pokeInput'),
    imagesContainer: document.querySelector('#imagesContainer'),
    infoContainer: document.querySelector('#infoContainer'),
    infoName: document.querySelector('#infoName'),
    infoHeight: document.querySelector('#infoHeight'),
    infoWeight: document.querySelector('#infoWeight'),
    infoType: document.querySelector('#infoType'),
    pokedexContainer: document.querySelector('#pokedexContainer')
}

export const styles = {
    listItem: 'list__item',
    hide: 'hide'
}

export const imagesView = {
    BACK_DEFAULT: 'back_default',
    FRONT_DEFAULT: 'front_default'
}