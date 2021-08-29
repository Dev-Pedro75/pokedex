const ul = document.querySelector("ul");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");

function getPokemons() {
  const PokemonsPromise = [];

  for (let i = 1; i < 152; i++) {
    PokemonsPromise.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) =>
        response.json()
      )
    );
  }

  Promise.all(PokemonsPromise).then((pokemons) => {
    pokemons.forEach(({ name, types, id }) => {
      ul.innerHTML += `
            <li class='${types[0].type.name}' onclick='openModal(${id})'>
                <div class='pokemon-image-container'>
                    <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id
                      .toString()
                      .padStart(3, 0)}.png'/>
                </div>
                <div class='pokemon-info-container'>
                    <p>#${id.toString().padStart(3, 0)}</p>
                    <h1>${name}</h1>
                    <h2>${types[0].type.name}</h2>  
                </div>
            </li>
        `;
    });
  });
}

function openModal(id) {
  modal.innerHTML = "<h1>Loading...</h1>";
  modalOverlay.style.display = "flex";
  setTimeout(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((response) => {
        modal.innerHTML = `
      <button onclick='closeModal()'>X</button>
      <div class='pokemon-image-modal'>
      <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${response.id
        .toString()
        .padStart(3, 0)}.png'/>
        </div>
        <div class='pokemon-info-modal'>
        <p>#${response.id.toString().padStart(3, 0)}</p>
        <h1>${response.name}</h1>
        <h2>${response.types[0].type.name}</h2>
        </div>
        <div class='pokemon-info-modal-2'>
        <h2>HP : ${response.stats[0].base_stat}</h2>
        <h2>Speed : ${response.stats[5].base_stat}</h2>
        <h2>Attack : ${response.stats[1].base_stat}</h2>
        <h2>Defense : ${response.stats[2].base_stat}</h2>
      </div>
      `;
      });
  }, 500);
}

function closeModal() {
  modalOverlay.style.display = "none";
  modal.innerHTML = "";
}

getPokemons();
