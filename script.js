const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const modeSelect = document.getElementById('mode');
const winnerDisplay = document.getElementById('winner');
const winningLine = document.createElement('div');
winningLine.classList.add('line');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let playerXName = '';
let playerOName = '';
let mode = '';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', startGame);
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});
resetButton.addEventListener('click', resetGame);

function startGame() {
    playerXName = playerXInput.value || 'Player X';
    playerOName = playerOInput.value || 'Player O';
    mode = modeSelect.value;
    playerXInput.disabled = true;
    playerOInput.disabled = true;
    modeSelect.disabled = true;
    startButton.classList.add('hidden');
    board.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    winnerDisplay.textContent = `${playerXName}'s turn`;

    if (mode === 'pvc' && currentPlayer === 'O') {
        
        computerMove();
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (gameState[cellIndex] !== null) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        winnerDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins!`;
        drawWinningLine();
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (gameState.every(cell => cell !== null)) {
        winnerDisplay.textContent = "It's a tie!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (mode === 'pvc' && currentPlayer === 'O') {
            // Computer makes a move if it's the computer's turn in 'pvc' mode
            computerMove();
        } else {
            winnerDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === player;
        });
    });
}

function drawWinningLine() {
    const winCombination = winningCombinations.find(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });

    if (winCombination) {
        const firstCell = cells[winCombination[0]];
        const lastCell = cells[winCombination[2]];
        const firstCellRect = firstCell.getBoundingClientRect();
        const lastCellRect = lastCell.getBoundingClientRect();

        const boardRect = board.getBoundingClientRect();
        const startX = firstCellRect.left - boardRect.left + firstCellRect.width / 2;
        const startY = firstCellRect.top - boardRect.top + firstCellRect.height / 2;
        const endX = lastCellRect.left - boardRect.left + lastCellRect.width / 2;
        const endY = lastCellRect.top - boardRect.top + lastCellRect.height / 2;

        const angle = Math.atan2(endY - startY, endX - startX);
        const length = Math.hypot(endX - startX, endY - startY);

        winningLine.style.width = `${length}px`;
        winningLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}rad)`;

        board.appendChild(winningLine);
    }
}

function resetGame() {
    gameState.fill(null);
    currentPlayer = 'X';
    winnerDisplay.textContent = `${playerXName}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    if (winningLine.parentNode) {
        board.removeChild(winningLine);
    }
    playerXInput.disabled = false;
    playerOInput.disabled = false;
    modeSelect.disabled = false;
    playerXInput.value = '';
    playerOInput.value = '';
    startButton.classList.remove('hidden');
    board.classList.add('hidden');
    resetButton.classList.add('hidden');
}

function computerMove() {
   
    let emptyCells = [...document.querySelectorAll('.cell')].filter(cell => !cell.textContent);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = currentPlayer;
    gameState[Array.from(cells).indexOf(randomCell)] = currentPlayer;

    if (checkWin(currentPlayer)) {
        winnerDisplay.textContent = `${playerOName} wins!`;
        drawWinningLine();
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (gameState.every(cell => cell !== null)) {
        winnerDisplay.textContent = "It's a tie!";
    } else {
        currentPlayer = 'X';
        winnerDisplay.textContent = `${playerXName}'s turn`;
    }
} 
