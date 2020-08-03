const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers()  {
    fetch(TRAINERS_URL) 
    .then(resp => resp.json())
    .then(trainers => {
        displayTrainers(trainers)
    })
}

function displayTrainers(trainers) {
    trainers.forEach(trainer => {
        const trainerCard = document.createElement("div")
        trainerCard.className = "deck"
        trainerCard.dataset.id = trainer.id
        trainerCard.innerHTML = 
        `
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
            ${trainer.pokemons.map( pokemon => {
            `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            }).join('')}
        </ul>
        `

    })


} 