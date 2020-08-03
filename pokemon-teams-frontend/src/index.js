const main = document.querySelector("main")

function getTrainers()  {
    fetch("http://localhost:3000/trainers") 
    .then(resp => resp.json())
    .then(trainers => {
        displayTrainers(trainers)
    })
}

function displayTrainers(trainers) {
    trainers.forEach(trainer => {
        const trainerCard = document.createElement("div")
        trainerCard.className = "card"
        trainerCard.dataset.id = trainer.id
        trainerCard.innerHTML = 
        `
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
            ${trainer.pokemons.map(pokemon => {
            return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            }).join('')}
        </ul>
        `
        trainerCard.addEventListener("click", (event) => {
            if(event.target.tagName === "BUTTON") {
                switch(event.target.innerText){
                case 'Add Pokemon':
                    createPokemon(parseInt(event.target.dataset.trainerId))
                break;
                case 'Release':
                    let pokemonId = parseInt(event.target.dataset.pokemonId)
                    event.target.parentNode.remove()
                    releasePokemon(pokemonId)
                break;
                }
            }
        })
        main.append(trainerCard)
    })
} 

function releasePokemon(pokemonId) {
    fetch("http://localhost:3000/pokemons/"+pokemonId, {
        method: "DELETE"
    })
    .then(resp => resp.json())
}

function createPokemon(trainerId) {
    fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'trainer_id' : trainerId
        })
    })
    .then(resp => resp.json())
    .then(pokemon => { 
        let trainerCard = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
        let pokemonList = trainerCard.querySelector('ul')
        pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
}

getTrainers()