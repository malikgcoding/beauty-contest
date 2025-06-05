// TODO: Implement additional rules and game logic:
// Each player starts with 0 points. Every round, all players except for the winner lose one point. If a player reaches -5 points, they are eliminated.
// - When only two players are left and one of them guesses 0, the other player wins if they guess 100.
// - If two or more players guess the same number, both of them lose one point.
// - If a player guesses the exact target (rounded to the nearest integer), the other players lose two points.


const socket = io();

// Store player's name for reference throughout the game
let name = "";

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

// This appears to be a duplicate event handler - might want to remove one of these
socket.on('registered', (player) => {
    document.getElementById('gamestart').style.display = 'none'
    document.getElementById('guess').style.display = 'block';
    console.log(`Player ${player.name} registered`);
});

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
    const whois = data.guesses.find(playboy => playboy.name === name);
    const myPoints = whois ? whois.points : "unknown";
    document.getElementById('messages').innerText =
    `Target: ${data.target} - The winner of this round is: ${data.winner}!`
    + `\nYour current points: ${myPoints}`;
});

// Handle error messages from the server
socket.on('error', (error) => {
    document.getElementById('messages').innerText = `Error: ${error}`;
});