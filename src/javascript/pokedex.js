const listPokemon = document.getElementById('listPokemon'),
      typePokedex = ['national', 'kanto', 'original-johto'];

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
                    const li = document.createElement('li'),
                          a = document.createElement('a'),
                          node = document.createTextNode(each.name),
                          path = window.location.href,
                          url = path.replace('.html', `-general.html?pok=${pok}`);

                          a.setAttribute('href', url);
                          a.appendChild(node);
                          li.appendChild(a);

                    listPokemon.appendChild(li);
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