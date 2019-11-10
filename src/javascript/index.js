import styles from '../css/home.css';

var pokemon,
    pokeSearch = document.getElementById("pokeSearch"),
    pokeInput  = document.getElementById("pokeInput");


var fetchInfo = () => {
    var xhttp = new XMLHttpRequest(),
        pokeInput = document.getElementById("pokeInput").value,
        pokeImage = document.getElementById("pokeImage");

        console.log(pokeInput);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var infoPokemon = JSON.parse(this.response),
                sprites     = infoPokemon && infoPokemon.sprites,
                frontImage  = sprites && sprites.front_default;
            
            pokeImage.src = frontImage;
        }
    }
    
    xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokeInput}`, true);
    xhttp.send();
    
}

pokeSearch.addEventListener('click', fetchInfo);
pokeInput.classList.add(styles.searchInput);
console.log(styles);


