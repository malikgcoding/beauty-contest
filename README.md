# Beauty Contest Game

## Overview
The "Beauty Contest" game is a multiplayer number guessing game inspired by the Alice in Borderland series. Players compete against each other to guess a secret number, with the goal of being the closest to the target number.

## Features
- Simple GUI for user interaction
- Multiplayer capabilities allowing multiple players to join and compete
- Game logic to handle guesses and determine the winner

## Project Structure
```
beauty-contest-game
├── src
│   ├── main.ts              # Entry point of the application
│   ├── gui
│   │   └── index.ts         # GUI management
│   ├── multiplayer
│   │   └── server.ts        # Multiplayer server handling
│   ├── game
│   │   ├── beautyContest.ts  # Game logic
│   │   └── player.ts        # Player representation
│   └── types
│       └── index.ts         # Type definitions
├── package.json              # NPM configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Installation
To install the necessary dependencies, run the following command in the project directory:

```
npm install
```

## Running the Game
To start the game, use the following command:

```
npm start
```

This will initialize the GUI and set up the multiplayer server.

## How to Play
1. Launch the game and enter your name.
2. Join the game room.
3. Wait for the game to start.
4. Make your guess when prompted.
5. The game will announce the winner after all guesses are made.

## Contributing
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and suggestions are welcome!