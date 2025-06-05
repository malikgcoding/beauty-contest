export class Player {
    private name: string;
    private currentGuess: number | null;
    private points: number;

    constructor(name: string) {
        this.name = name;
        this.currentGuess = null;
        this.points = 0; // Players start with 0 points
    }

    // Record the player's guess for this round
    makeGuess(guess: number): void {
        this.currentGuess = guess;
    }

    // Return player data for state updates and display
    getPlayerInfo(): { name: string; currentGuess: number | null } {
        return {
            name: this.name,
            currentGuess: this.currentGuess,
        };
    }

    getName(): string {
        return this.name;
    }

    getCurrentGuess(): number | null {
        return this.currentGuess;
    }

    getPoints(): number {
        return this.points;
    }

    // Update player's points (positive for gain, negative for loss)
    // Points are critical - if a player reaches -5, they are eliminated
    addPoints(amount: number): void {
        this.points += amount;
        }

    // Reset for a new round (keep points, clear guess)
    reset(): void {
        this.currentGuess = null;
    }
}
