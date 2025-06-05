// TODO: Implement additional rules and game logic:
// - When only two players are left and one of them guesses 0, the other player wins if they guess 100.

import { Player } from './player';

export class BeautyContest {
    private target: number | null = null;
    private players: Player[];

    constructor() {
        this.players = [];
    }

    // Add a new player to the game
    public newPlayer(player: Player): void {
        this.players.push(player);
    }

    // Reset the game state for a new round
    public start(): void {
        this.players.forEach(player => player.reset());
        this.target = null;
        console.log("Game started");
    }

    // The key mechanic of the beauty contest game:
    // Target is 80% of the average of all guesses (as in Keynes' beauty contest)
    public calculateTarget(): number {
        const guesses = this.players.map(playboy => playboy.getCurrentGuess()).filter(guessy => guessy !== null && guessy >= 0 && guessy <= 100) as number[];
        const average = guesses.reduce((acc, guessy) => acc + guessy, 0) / guesses.length;
        this.target = (average * 0.8);
        return this.target;
    }

    // Process a player's guess
    public handleGuess(player: Player, guess: number){
        player.makeGuess(guess);
    }

    // Check if all players have submitted their guesses
    public guessed(): boolean {
        return this.players.every(playboy => playboy.getCurrentGuess() !== null);
    }

    // Determine the winner - closest to the target value
    public winner(): Player | null {
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

    // Update points based on the complex game rules
    public updatePoints(): void {
    const winner = this.winner();
    if (!winner) return;

    const guesses = this.players.map(p => p.getCurrentGuess());
    const exact = Math.round(this.target!);

    // Count occurrences of each guess to identify duplicates
    const count = guesses.reduce((counter, guess) => {
        if (guess !== null) {
            counter[guess] = (counter[guess] || 0) + 1;
        }
        return counter;
    }, {} as Record<number, number>);

    const winnerGuess = winner.getCurrentGuess();
    const winnerGuessCount = winnerGuess !== null ? count[winnerGuess] : 0;

    // Case 1: Multiple players guessed the winning number
    // In this case, all players lose points (even those who guessed correctly)
    if (winnerGuess !== null && winnerGuessCount > 1) {
        // Everyone loses 1 point
        for (const player of this.players) {
            if (player.getPoints() > -5) {
                player.addPoints(-1);
            }
        }
        return;
    }

    // Case 2: Someone guessed the exact target (special bonus rule)
    // Other players lose 2 points instead of 1
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

    // Case 3: Standard case - winner stays the same, losers each lose 1 point
    // Stop deducting points if player is already at elimination threshold (-5)
    for (const player of this.players) {
        if (player !== winner && player.getPoints() > -5) {
            player.addPoints(-1);
        }
    }
}
}
