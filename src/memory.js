// Import image array
import memoryCards from './images';

export default function memoryGame(selector = '.memory') {
  // Declare selectors
  const memoryCont = document.querySelector(selector)
  const scoreBoard = document.querySelector('.scoreboard span');
  const done = document.querySelector('.done');

  // Init values
  let selectedCard = [];
  let points = 0;

  //To do 
  /* Implement scoring system based on how many moves you make */
  let moves = 0;

  function lockBoard() {
    memoryCont.classList.add('locked')
  }

  function unlockBoard() {
    memoryCont.classList.remove('locked')
  }

  // Handle click
  function flip(el) {
      if (el.classList.contains('flip')) return;
      
      selectedCard.push(el);
      el.classList.add('flip');
      moves++

      if (selectedCard.length == 2) {
        setTimeout(isMatching, 500);
    }
  }

  // Check for matching cards
  function isMatching() {
    const match = selectedCard[0].dataset.id === selectedCard[1].dataset.id;

    match ? updateScore() : unflip(); 
  }

  // Update points on scoreboard
  function updateScore() {
    points++
    scoreBoard.innerHTML = points;
    reset();

    //Add repalay modal
    if (points === 8) {
      showDone();
    }
  }

  // Unflip non-matching cards
  function unflip() {
    lockBoard();
    setTimeout(() => {
      selectedCard.forEach(el => el.classList.remove('flip'));
      reset();
    }, 1000);
  }

  // Create memory card elements
  function createCard(img) {
    const card = document.createElement('li');
    const image = document.createElement('img');
    card.classList.add('card');
    image.setAttribute('src', img.image);
    card.setAttribute('data-id', img.id);
    card.appendChild(image);
    card.addEventListener('click', () => flip(card))
    
    return card 
  }

  // Reset selected and unlocking board
  function reset() {
    unlockBoard();
    selectedCard = []; 
  }

  function showDone() {
    done.classList.add('show')
    done.addEventListener('click', replay, {once: true})
  }

  function replay() {
    done.classList.remove('show')
    points = 0
    moves = 0
    //Reset containers
    scoreBoard.innerHTML = points;
    memoryCont.innerHTML = ''
    init();
  }

  function init() {
    // Randomize cards
    memoryCards.sort(() => .5 - Math.random());
    // Render cards to container
    memoryCards.forEach(img => {
      memoryCont.appendChild(createCard(img))
    })
  }

  return {
    init
  }
}
