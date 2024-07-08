Tic-Tac-Toe App README
Overview
Welcome to the Tic-Tac-Toe App! This is a simple, interactive web-based version of the classic Tic-Tac-Toe game. The app allows you to play either against another player or against the computer.

Features
Player vs. Player Mode: Two players can play against each other on the same device.
Player vs. Computer Mode: A single player can play against a computer opponent.
Dynamic Board: Interactive game board with visual feedback for player moves and win conditions.
Customizable Player Names: Enter player names before starting the game.
Reset Functionality: Restart the game at any time.
Getting Started
Prerequisites
A web browser (e.g., Chrome, Firefox, Safari).

Installation
Download or clone the repository to your local machine.
Open the index.html file in your web browser to start the game.

Files
index.html: The main HTML file containing the structure of the app.
styles.css: The CSS file for styling the app.
script.js: The JavaScript file containing the game logic.

How to Play
Enter Player Names: Input the names for Player X and Player O in the respective text fields.
Select Game Mode: Choose either "Player vs. Player" or "Player vs. Computer" from the dropdown menu.
Start the Game: Click the "Start Game" button to begin.
Make Moves: Click on an empty cell on the board to make a move. The current player's move will be displayed in the cell.
Win or Tie: The game will detect and announce a win or a tie. The winning line will be highlighted for a win.
Reset the Game: Click the "Reset Game" button to start a new game.

Game Logic
Variables
currentPlayer: Tracks the current player ('X' or 'O').
gameState: An array representing the state of the board.
playerXName and playerOName: Store the names of Player X and Player O.
mode: Stores the selected game mode ('pvp' or 'pvc').

Functions
startGame(): Initializes the game, sets player names, disables input fields, and shows the game board.
handleCellClick(e): Handles cell click events, updates the game state, and checks for a win or tie.
checkWin(player): Checks if the current player has won the game.
drawWinningLine(): Draws a line over the winning combination of cells.
resetGame(): Resets the game state, board, and UI elements for a new game.
computerMove(): Handles the computer's move in "Player vs. Computer" mode.

Styling
The app is styled using styles.css.
The board is displayed as a 3x3 grid.
Different visual effects for hover states, button interactions, and win conditions.

Acknowledgements
Thanks for using this Tic-Tac-Toe App. Have fun playing!

