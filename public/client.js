// PUBLIC FOLDER TODO:
// 1. Optimize for mobile
//2. Show which players have guessed along with their guesses
// 3. Maybe build an actual pretty UI 
// 4. Exclude eliminated players from the game

const socket = io();
let myName = "";

// Store player's name for reference throughout the game
socket.on('registered', (player) => {
    myName = player.name;
    document.getElementById('gamestart').style.display = 'none'
    document.getElementById('guess').style.display = 'block';
    console.log(`Player ${player.name} registered`);
});

// Handle player registration when they click the register button
document.getElementById('registerBtn').onclick = () => {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Player, please enter a valid name, or you will be eliminated.');
        return;
    }
    socket.emit('register', name);
};

// Process player's guess and send it to the server
document.getElementById('guessBtn').onclick = () => {
    const guess = Number(document.getElementById('guessField').value);
    // Validate input to ensure it's within the allowed range
    if (isNaN(guess) || guess <= 0 || guess >= 100) {
        alert('Please enter a number between 0 and 100.');
    } else {
        socket.emit('makeGuess', guess);
        console.log(`Player ${player.name} guessed ${guess}`);
    }
};

// Update the UI when game state changes
socket.on('gameStateUpdate', (gameState) => {
    document.getElementById('messages').innerText = `Current round: ${gameState.currentRound}`;
});

// Display prompt when the game starts
socket.on('gameStarted', () => {
    document.getElementById('messages').innerText = 'Player, please guess a number between 0 and 100.';
});

// Show results after all players have submitted their guesses
socket.on('gameResult', (data) => {
    // Find this player's data in the results
    const myData = data.guesses.find(player => player.name === myName);
    const myPoints = myData ? myData.points : "unknown";
    document.getElementById('messages').innerText =
    `Target: ${data.target} - The winner of this round is: ${data.winner}!`
    + `\nYour current points: ${myPoints}`;
});

// Handle error messages from the server
socket.on('error', (error) => {
    document.getElementById('messages').innerText = `Error: ${error}`;
});