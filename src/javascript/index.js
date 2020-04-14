let pokemon,
    pokeSearch = document.getElementById('pokeSearch'),
    pokeInput  = document.getElementById('pokeInput'),
    imagesContainer = document.getElementById('imagesContainer'),
    infoContainer = document.getElementById('infoContainer'),
    infoName = document.getElementById('infoName'),
    infoHeight = document.getElementById('infoHeight'),
    infoWeight = document.getElementById('infoWeight'),
    infoType = document.getElementById('infoType'),
    listPokemon = document.getElementById('listPokemon'),
    typePokedex = ['national', 'kanto', 'original-johto'],
    BACK_DEFAULT = 'back_default',
    FRONT_DEFAULT = 'front_default',
    currentImage = FRONT_DEFAULT,
    newpokemon = '<img id="leftArrow" class="arrow arrow--left" src="../assets/redArrow.png"></img><img id="pokeImage" class="pokeImage"></img><img id="rightArrow" class="arrow arrow--right" src="../assets/redArrow.png"></img>';

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
        type = types[0].type.name;

        console.log(weight)
        
    infoHeight.innerText = height;
    infoName.innerText = name;
    infoWeight.innerText = weight;
    infoType.innerText = type;

    infoContainer.style.display = 'block';
}

const fetchInfoNew = () => {
    const pokeInput = document.getElementById("pokeInput").value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(infoPokemon => {
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

const fetchList = () => {
    fetch(`https://pokeapi.co/api/v2/pokedex`)
    .then(response => {
        return response.json();
    })
    .then(infoList => {
       const results = infoList.results;

       results.forEach(each => {
            typePokedex.forEach(pok => {
                if (pok === each.name) {
                    const el = document.createElement('li'),
                          node = document.createTextNode(each.name);
                    
                          el.appendChild(node);
                          el.addEventListener("click", () => {
                            fetch(each.url)
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                console.log(res);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                          });
        
                    listPokemon.appendChild(el);
                }
            });
       });
    })
    .catch(error => {
        console.log(error);
    })
}

fetchList();

// NEXT STEPS 

/* 1) INFO OF THE pokemon
2) CHART 
3) LIST OF POKEMONS WITH PAGINATION */