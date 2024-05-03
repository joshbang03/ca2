document.getElementById('startButton').addEventListener('click', startGame);

const gameArea = document.getElementById('gameArea');
const scoreSpan = document.getElementById('score');
const livesSpan = document.getElementById('lives');
let score = 0;
let lives = 3;
let gameInterval;
let fallSpeed = 50; 
let creationFrequency = 1000; 
let startTime = Date.now();

function startGame() {
    if (gameInterval) clearInterval(gameInterval);

    score = 0; 
    lives = 3; 
    fallSpeed = 50; 
    creationFrequency = 1000;
    startTime = Date.now(); 

    gameInterval = setInterval(() => {
        if (Math.random() < 0.4) {
            createObject();
        }
        increaseDifficulty();
    }, creationFrequency);
}

function createObject() {
    const object = document.createElement('div');
    object.classList.add('object');
    object.style.left = `${Math.floor(Math.random() * (gameArea.clientWidth - 50))}px`;
    object.style.top = `0px`;
    object.style.backgroundImage = 'url("assets/football.png")'; 

    gameArea.appendChild(object);

    let position = 0;
    const fallInterval = setInterval(() => {
        position += 7; 
        object.style.top = `${position}px`;

        if (position > gameArea.clientHeight) {
            object.remove();
            updateLives(-1);
            clearInterval(fallInterval);
        }
    }, fallSpeed);

    object.addEventListener('click', function() {
        updateScore(1);
        object.remove();
        clearInterval(fallInterval);
    });
}

function updateScore(points) {
    score += points;
    scoreSpan.textContent = score;
    if (score % 100 === 0) { 
        increaseDifficulty();
    }
}

function updateLives(change) {
    lives += change;
    livesSpan.textContent = lives;
    if (lives <= 0) {
        alert("Game Over!");
        clearInterval(gameInterval); 
    }
}

function increaseDifficulty() {
    const elapsedTime = (Date.now() - startTime) / 1000; 
    if (elapsedTime > 30) { 
        fallSpeed = Math.max(10, fallSpeed * 0.95); 
        creationFrequency = Math.max(300, creationFrequency * 0.95); 
        startTime = Date.now(); 
    }

    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        if (Math.random() < 0.4) {
            createObject();
        }
    }, creationFrequency);
}
