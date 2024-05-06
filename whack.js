document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startButton');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let gameActive = false;

    function updateScore() {
        scoreDisplay.textContent = score;
        scoreDisplay.classList.add('score-change-animation');
        scoreDisplay.addEventListener('animationend', () => {
            scoreDisplay.classList.remove('score-change-animation');
        });
    }


    function randomMole() {
        if (!gameActive) return;
        const holes = document.querySelectorAll('.hole');
        const index = Math.floor(Math.random() * holes.length);
        const moleType = Math.random() > 0.8 ? 'mole2' : 'mole'; // 20% chance to be mole2
        const mole = document.createElement('div');
        mole.classList.add(moleType);
        mole.style.opacity = '1';
        if (holes[index].hasChildNodes()) {
            holes[index].firstChild.remove();
        }
        holes[index].appendChild(mole);
        setTimeout(() => {
            mole.remove();
        }, 1000); 
    }

    function startGame() {
        gameActive = true;
        score = 0;
        updateScore();
        setInterval(randomMole, 1500);
    }

    gameBoard.addEventListener('click', function(event) {
        if (!gameActive) return;
        if (event.target.classList.contains('mole')) {
            score++;
            updateScore();
            event.target.remove();
        } else if (event.target.classList.contains('mole2')) {
            gameActive = false; 
            showModalGameOver();
        }
    });

    function showModalGameOver() {
        var modal = document.getElementById('gameOverModal');
        var span = document.getElementsByClassName('close-button')[0];
        
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        modal.style.display = "block";
    }

    startButton.addEventListener('click', startGame);
    
});
