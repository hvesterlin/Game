const cardsArray = [
    { name: 'elephant', img: 'https://example.com/elephant.jpg' },
    { name: 'giraffe', img: 'https://example.com/giraffe.jpg' },
    { name: 'lion', img: 'https://example.com/lion.jpg' },
    { name: 'tiger', img: 'https://example.com/tiger.jpg' },
    { name: 'monkey', img: 'https://example.com/monkey.jpg' },
    { name: 'zebra', img: 'https://example.com/zebra.jpg' },
    { name: 'bear', img: 'https://example.com/bear.jpg' },
    { name: 'fox', img: 'https://example.com/fox.jpg' }
];

let gameGrid = [...cardsArray, ...cardsArray]; // Duplicera kort för matchning

// Blanda korten
gameGrid.sort(() => 0.5 - Math.random());

const game = document.getElementById('memory-game');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Skapa korten
gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.name = item.name;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.textContent = '?';

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    const img = document.createElement('img');
    img.src = item.img;
    backFace.appendChild(img);

    card.appendChild(frontFace);
    card.appendChild(backFace);
    game.appendChild(card);

    card.addEventListener('click', flipCard);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
