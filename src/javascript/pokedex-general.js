let pokemon,
    pokeSearch = document.getElementById('pokeSearch'),
    pokeInput  = document.getElementById('pokeInput'),
    imagesContainer = document.getElementById('imagesContainer'),
    infoContainer = document.getElementById('infoContainer'),
    infoName = document.getElementById('infoName'),
    infoHeight = document.getElementById('infoHeight'),
    infoWeight = document.getElementById('infoWeight'),
    infoType = document.getElementById('infoType'),
    BACK_DEFAULT = 'back_default',
    FRONT_DEFAULT = 'front_default',
    currentImage = FRONT_DEFAULT,
    newpokemon = '<img id="leftArrow" class="arrow arrow--left" src="../assets/redArrow.png"></img><img id="pokeImage" class="pokeImage"></img><img id="rightArrow" class="arrow arrow--right" src="../assets/redArrow.png"></img>',
    typePokedex = ['national', 'kanto', 'original-johto'];

const changeImage = (images, type, elem) => {
    if(type === FRONT_DEFAULT) {
        currentImage = BACK_DEFAULT;

        elem.src = images.back_default;
    } else if (type === BACK_DEFAULT){
        currentImage = FRONT_DEFAULT;
        
        elem.src = images.front_default;
    }
};

const addPokemon = images => {
    imagesContainer.innerHTML = newpokemon;

    let pokeImage = document.getElementById("pokeImage");

    pokeImage.src = images.front_default;
}

const deletePokemon = () => {
    let pokeImage = document.getElementById("pokeImage");

    if (pokeImage) {
        pokeImage.innerHTML = '';
    }
}

const addEvents = (info) => {
    let leftArrow = document.getElementById("leftArrow"),
        rightArrow = document.getElementById("rightArrow"),
        pokeImage = document.getElementById("pokeImage");

    leftArrow.addEventListener("click", () => { changeImage(info, currentImage, pokeImage)});
    rightArrow.addEventListener("click", () => { changeImage(info, currentImage, pokeImage)});

}

const getImages = sprites => {
    return Object.keys(sprites).reduce((acc ,key) => {

        if (key === BACK_DEFAULT || key === FRONT_DEFAULT) {
            acc[key] = sprites[key];
        }

        return acc;
    }, {});
}

const addInfo = info => {
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

    infoContainer.style.display = 'block';
}

const fetchInfoNew = () => {
    const pokeInput = document.getElementById("pokeInput").value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}`)
    .then(response => {
        return response.json();
    })
    .then(infoPokemon => {
        console.log("infoPokemon infoPokemon",infoPokemon);
        const sprites = infoPokemon.sprites,
              images = getImages(sprites);

        deletePokemon();
        addPokemon(images);
        addInfo(infoPokemon);
        addEvents(images);
    })
    .catch(error => {
        console.log(error);
    })
}

pokeSearch.addEventListener('click', fetchInfoNew);

const fetchInfoPok = () => {
    const param = window.location.search,
          urlParams = new URLSearchParams(param);
          pok = urlParams.get('pok'),
          url = 'https://pokeapi.co/api/v2/pokedex/';

        if(pok === typePokedex[0]) {
            url += '1';
        } else if(pok === typePokedex[1]) {
            url += '2';
        } else {
            url += '3'
        }
    
    fetch(url)
    .then(res => {
        return res.json();
    })
    .then(res => {
        let pokemons,
            entries = res.pokemon_entries;

            pokemons = entries.map(each => {
                const pokemon = each.pokemon_species.name;

                return pokemon;
            });
            
            pokeInput.addEventListener("keyup", () => {

                listPokemon.innerHTML = '';
                pokemons.forEach(each => {
                    const input = document.getElementById("pokeInput"),
                          inputVal = input.value;

                    if(each.toLowerCase().indexOf(inputVal) > -1 && inputVal !== '') {
                        const el = document.createElement('li'),
                            node = document.createTextNode(each);
                    
                        el.appendChild(node);
                        el.addEventListener("click", e => {
                            const srcElement = e.srcElement,
                                  innerText = srcElement.innerText;
                            
                            input.value = innerText;
                            listPokemon.innerHTML = '';
                        });
                        listPokemon.appendChild(el);
                    }
                });
            })
    })
    .catch(error => {
        console.log(error);
    });      
};

fetchInfoPok();


// NEXT STEPS 

/* 1) INFO OF THE pokemon
2) CHART 
3) LIST OF POKEMONS WITH PAGINATION
4) spinner  */