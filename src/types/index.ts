export interface PlayerInfo {
    name: string;
    currentGuess: number;
}
export interface GameState {
    players: PlayerInfo[];
    currentRound: number;
    target: number;
    gameOver: boolean;
}