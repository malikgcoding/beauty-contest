const socket = io();
let myName = "";

socket.on('registered', (player) => {
    myName = player.name;
    document.getElementById('registration-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    console.log(`Player ${player.name} registered`);
});

document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enter');
    const submitButton = document.getElementById('submit');
    const nameInput = document.getElementById('name');
    const guessInput = document.getElementById('guesshere');
    
    if (nameInput) {
        nameInput.addEventListener('focus', () => {
            if (nameInput.value === '<name>') {
                nameInput.value = '';
            }
        });
        
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleRegister();
            }
        });
    }

    if (guessInput) {
        guessInput.addEventListener('focus', () => {
            if (guessInput.value === '<name>') {
                guessInput.value = '';
            }
        });
        
        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });
    }

    function updateLeaderboard(playersData) {
    const playersList = document.getElementById('players');
    if (!playersList) return;
    
    playersList.innerHTML = '';
    
    const sortedPlayers = playersData.sort((a, b) => b.points - a.points);
    
    sortedPlayers.forEach((player, index) => {
        const listItem = document.createElement('li');
        
        if (player.name === myName) {
            listItem.style.color = 'white';
        }
        
        listItem.textContent = `${index + 1}. ${player.name}: ${player.guess} (${player.points} pts)`;
        
        playersList.appendChild(listItem);
    });
    }

    
    function handleRegister() {
        const name = document.getElementById('name').value;
        if (!name || name === '<name>') {
            alert('Player, please enter a valid name, or you will be eliminated.');
            return;
        }
        socket.emit('register', name);
    }

    function makeGuess(){
        const guess = Number(document.getElementById('guesshere').value);
            if (isNaN(guess) || guess < -1 || guess > 101) {
                alert('Player, please enter a number between 0 and 100, or you will be eliminated.');
            } else {
                document.getElementById('messages').innerText = `YOUR GUESS:  + ${guess}`;
                socket.emit('makeGuess', guess);
                console.log(`Player ${myName} guessed ${guess}`);
        }
    }

    if (enterButton) {
        enterButton.onclick = handleRegister;
    }

    if (submitButton) {
        submitButton.onclick = makeGuess;
    }

    socket.on('gameResult', (data) => {
    const myData = data.guesses.find(playerData => playerData.name === myName);
    const myPoints = myData ? myData.points : "unknown";
    const winMessage = document.getElementById('winmessages');
    if (winMessage) {
        winMessage.innerText =
        `Target: ${data.target} - The winner of this round is: ${data.winner}!`
        + `\nYour current points: ${myPoints}`;
    }
    
    updateLeaderboard(data.guesses);
    });
});
