document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startButton');

    // Create holes on the game board
    function createHoles(numberOfHoles = 9) {
        for (let i = 0; i < numberOfHoles; i++) {
            const hole = document.createElement('div');
            hole.className = 'hole';
            gameBoard.appendChild(hole);
        }
    }

    startButton.addEventListener('click', () => {
        if (typeof startGame === 'function') {
            startGame();
        }
    });

    createHoles(); // Initialize game board with holes
});
