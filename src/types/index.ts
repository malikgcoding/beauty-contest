// Player information - basic player state data sent over the network
export interface PlayerInfo {
    name: string;
    currentGuess: number;
}

// Current state of the game - used to synchronize all clients
export interface GameState {
    players: PlayerInfo[];
    currentRound: number;
    target: number;
    gameOver: boolean;
}