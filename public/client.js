// PUBLIC FOLDER TODO:
// 1. Optimize for mobile
//2. Show which players have guessed along with their guesses
// 3. Maybe build an actual pretty UI 
// 4. Exclude eliminated players from the game

const socket = io();
let myName = "";

socket.on('registered', (player) => {
    myName = player.name;
    document.getElementById('gamestart').style.display = 'none'
    document.getElementById('guess').style.display = 'block';
    console.log(`Player ${player.name} registered`);
});

document.getElementById('registerBtn').onclick = () => {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Player, please enter a valid name, or you will be eliminated.');
        return;
    }
    socket.emit('register', name);
};

document.getElementById('guessBtn').onclick = () => {
    const guess = Number(document.getElementById('guessField').value);
    if (isNaN(guess) || guess < -1 || guess > 101) {
        alert('Player, please enter a number between 0 and 100, or you will be eliminated.');
    } else {
        document.getElementById('messages').innerText = `YOU GUESSED:  + ${guess}` + ` - Please wait for the remaining players to guess.`;
        socket.emit('makeGuess', guess);
        console.log(`Player ${player.name} guessed ${guess}`);
    }
};

socket.on('gameStateUpdate', (gameState) => {
    document.getElementById('messages').innerText = `Current round: ${gameState.currentRound}`;
});

socket.on('gameStarted', () => {
    document.getElementById('messages').innerText = 'Player, please guess a number between 0 and 100.';
});

socket.on('gameResult', (data) => {
    const myData = data.guesses.find(player => player.name === myName);
    const myPoints = myData ? myData.points : "unknown";
    document.getElementById('messages').innerText =
    `Target: ${data.target} - The winner of this round is: ${data.winner}!`
    + `\nYour current points: ${myPoints}`;
});

socket.on('error', (error) => {
    document.getElementById('messages').innerText = `Error: ${error}`;
});