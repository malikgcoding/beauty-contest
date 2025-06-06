// TODO: Implement additional rules and game logic:
// - When only two players are left and one of them guesses 0, the other player wins if they guess 100.
// - Exclude eliminated players from the game instead of letting them play.

import { Player } from './player';

export class BeautyContest {
    private target: number | null = null;
    private players: Player[];

    constructor() {
        this.players = [];
    }

    public newPlayer(player: Player): void {
        this.players.push(player);
    }

    public start(): void {
        this.players.forEach(player => player.reset());
        this.target = null;
        console.log("Game started");
    }

    // Target is 80% of the average of all guesses so the game isn't entirely based on luck
    public calculateTarget(): number {
        const guesses = this.players.map(playerT => playerT.getCurrentGuess()).filter(guessT => guessT !== null && guessT >= 0 && guessT <= 100) as number[];
        const average = guesses.reduce((acc, guessT) => acc + guessT, 0) / guesses.length;
        this.target = (average * 0.8);
        return this.target;
    }

    public handleGuess(player: Player, guess: number){
        player.makeGuess(guess);
    }

    public guessed(): boolean {
        return this.players.every(playerT => playerT.getCurrentGuess() !== null);
    }

    // The player closest to the target wins
    public winner(): Player | null {
        
        if (this.players.length === 2) {
            const player1 = this.players[0];
            const player2 = this.players[1];
            const guess1 = player1.getCurrentGuess();
            const guess2 = player2.getCurrentGuess();
            
            if (guess1 === 0 && guess2 === 100) {
                return player2;
            } else if (guess1 === 100 && guess2 === 0) {
                return player1;
            }
        }

        if (this.target === null) return null;
        let winner: Player | null = null;
        let closestDiff = Infinity;
        for (const player of this.players) {
            const guess = player.getCurrentGuess();
            if (guess !== null) {
                const diff = Math.abs(guess - this.target);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    winner = player;
                }
            }
        }
        return winner;
    }

    public updatePoints(): void {
    const winner = this.winner();
    if (!winner) return;

    const guesses = this.players.map(p => p.getCurrentGuess());
    const exact = Math.round(this.target!);

    const count = guesses.reduce((counter, guess) => {
        if (guess !== null) {
            counter[guess] = (counter[guess] || 0) + 1;
        }
        return counter;
    }, {} as Record<number, number>);

    const winnerGuess = winner.getCurrentGuess();
    const winnerGuessCount = winnerGuess !== null ? count[winnerGuess] : 0;

    // Case 1: Multiple players guessed the same winning number
    // In this case, all players lose
    if (winnerGuess !== null && winnerGuessCount > 1) {
        // Everyone loses 1 point
        for (const player of this.players) {
            if (player.getPoints() > -5) {
                player.addPoints(-1);
            }
        }
        return;
    }

    // Case 2: Winner guessed the exact target
    // Players lose 2 points instead of 1
    if (
        winnerGuess !== null &&
        Math.round(winnerGuess) === exact
    ) {
        for (const player of this.players) {
            if (player !== winner && player.getPoints() > -5) {
                player.addPoints(-2);
            }
        }
        return;
    }

    // Case 3: Standard case
    for (const player of this.players) {
        if (player !== winner && player.getPoints() > -5) {
            player.addPoints(-1);
        }
    }
}
}
