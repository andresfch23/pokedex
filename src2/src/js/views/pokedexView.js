import { elements, imagesView, styles } from '../vars';
import redArrow from '../../assets/redArrow.png';
import pokeBall from '../../assets/pokeBall.png';

let currentImage = imagesView.FRONT_DEFAULT;

export const renderPokedex = (type) => {
    const html = `
        <div id="pokedexContainer">
            <div class="head">
                <img src="${redArrow}" class="head__arrow"></img>
                <h1 class="head__title">${type}</h1>
            </div>
            <div class="search">
                <input class="search__input" type="text" id="pokeInput" autocomplete="off">
                <ul class="search__list" id="listPokemon"></ul>
                <button class="search__type" type="submit" id="pokeSearch" disabled="true">Search pokemon</button>
            </div>
            <div class="info">
                <div id="imagesContainer" class="info__images"></div>
                <div id="infoContainer" class="info__description">
                    <h2>Name: <span class="info__item" id="infoName"></span></h2>
                    <h2>Height: <span class="info__item" id="infoHeight"></span></h2>
                    <h2>Weight: <span class="info__item" id="infoWeight"></span></h2>
                    <h2>Type: <span class="info__item" id="infoType"></span></h2>
                </div>
            </div>
        </div>
    `;

    elements.body.insertAdjacentHTML('afterbegin',html);
}

export const hideDOM = () => {
    elements.list.classList.add(styles.hide)
    elements.header.classList.add(styles.hide);
}

export const changeImage = (images, type, elem) => {
    if(type === imagesView.FRONT_DEFAULT) {
        currentImage = imagesView.BACK_DEFAULT;

        elem.src = images.back_default;
    } else if (type === imagesView.BACK_DEFAULT){
        currentImage = imagesView.FRONT_DEFAULT;
        
        elem.src = images.front_default;
    }
};

export const addPokemon = images => {
    const newpokemon = `<img id="leftArrow" class="arrow arrow--left" src="${redArrow}"></img><img id="pokeImage" class="pokeImage"></img><img id="rightArrow" class="arrow arrow--right" src="${redArrow}"></img>`;

    imagesContainer.innerHTML = newpokemon;

    let pokeImage = document.getElementById("pokeImage");

    pokeImage.src = pokeBall;
    pokeImage.classList.add("pokeImage--ball");

    setTimeout(() => {
        pokeImage.src = images.front_default;
        pokeImage.classList.remove("pokeImage--ball");
    }, 1000)
}

export const deletePokemon = () => {
    let pokeImage = document.getElementById("pokeImage");

    if (pokeImage) {
        pokeImage.innerHTML = '';
    }
}

export const getImages = sprites => {
    return Object.keys(sprites).reduce((acc ,key) => {

        if (key === imagesView.BACK_DEFAULT || key === imagesView.FRONT_DEFAULT) {
            acc[key] = sprites[key];
        }

        return acc;
    }, {});
}

export const addInfo = info => {
    let { height, name, weight, types } = info,
        nameType = '';
        
        types.forEach(each => {
            const type = each.type,
                  name = type.name;

            if(name) {
                nameType += `${name}, `;
            }
        });

        nameType = nameType.slice(0, -2);
        
    infoHeight.innerText = height;
    infoName.innerText = name;
    infoWeight.innerText = weight;
    infoType.innerText = nameType;

    document.querySelector('.info').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight)
}

export const addEvents = (info) => {
    let leftArrow = document.getElementById("leftArrow"),
        rightArrow = document.getElementById("rightArrow"),
        pokeImage = document.getElementById("pokeImage");

    leftArrow.addEventListener("click", () => { changeImage(info, currentImage, pokeImage)});
    rightArrow.addEventListener("click", () => { changeImage(info, currentImage, pokeImage)});
}

export const optionsList = pokemons => {
    const input = document.getElementById('pokeInput'),
          listPokemon = document.getElementById('listPokemon'),
          search = document.getElementById('pokeSearch');

    listPokemon.innerHTML = '';

    if (!input.value) {
        search.disabled = true;
        search.classList.remove('search__type--allowed');
    } else {
        search.disabled = false;
        search.classList.add('search__type--allowed');
    }

    pokemons.forEach(each => {
        const inputVal = input.value.toLowerCase();

        if(each.toLowerCase().indexOf(inputVal) > -1 && inputVal !== '') {
            const regExp = new RegExp(inputVal, "gi"),
                  highlighted = each.replace(regExp, `<span class="highlight">${inputVal}</span>`),
                  elem = `<li>${highlighted}</li>`;

            listPokemon.insertAdjacentHTML('beforeend', elem);
        }
    });

    listPokemon.addEventListener("click", e => {
        const srcElement = e.srcElement,
              innerText = srcElement.innerText;
        
        input.value = innerText.toLowerCase();
        listPokemon.innerHTML = '';
    });
}


export const clearInput = () => {
    const input = document.getElementById('pokeInput'),
          search = document.getElementById('pokeSearch');

    search.disabled = true;
    search.classList.remove('search__type--allowed');

    input.value = '';
}

export const backList = () => {
    const pokedexContainer = document.querySelector('#pokedexContainer');
    
    pokedexContainer.parentNode.removeChild(pokedexContainer);

    elements.list.classList.remove(styles.hide);
    elements.header.classList.remove(styles.hide);  
}