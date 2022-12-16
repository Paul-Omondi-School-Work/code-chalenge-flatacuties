const setUpEvents = ()=>{
const character = document.getElementById('character-bar');
const animalName = document.getElementById('name');
const image = document.getElementById('image');
const form = document.getElementById('votes-form');
const animalVotes = document.getElementById('vote-count');
const input = document.getElementById('votes');
const resetVotes = document.getElementById('reset-btn');
let initialAnimal;

resetVotes.style.cursor = 'pointer';

//----- fetch data from server------
const getAnimals = ()=> {
  fetch('http://localhost:3000/characters/')
    .then(response => response.json())
    .then(displayAnimals);
}
//-----function that iterates the server object------
const displayAnimals = (animals)=> {
  animals.forEach(showCharacters);
}

//-----function that accesses individual payload elements and show their required data-----
const showCharacters = (animal) => {
  const stylAnimal = document.createElement('span');
  stylAnimal.innerHTML = animal.name;
  stylAnimal.style.cursor = 'pointer';
  character.appendChild(stylAnimal);
  stylAnimal.addEventListener('click', () => {
    initialAnimal = animal;
    exhibitAnimal(animal);
  });
}

//--------A function that dsplays curated data about the animal in question------------
const exhibitAnimal = (animal)=> {
  animalName.innerHTML = animal.name;
  image.src = animal.image;
  animalVotes.innerHTML = animal.votes;
}
getAnimals();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  initialAnimal.votes += parseInt(e.target.votes.value);
  exhibitAnimal(initialAnimal);
  form.reset();
});

resetVotes.addEventListener('click', () => {
  initialAnimal.votes = 0;
  exhibitAnimal(initialAnimal);
});
}

window.onload = function (){
    setUpEvents();
}
