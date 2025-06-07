export class Player {
    private name: string;
    private currentGuess: number | null;
    private points: number;

    constructor(name: string) {
        this.name = name;
        this.currentGuess = null;
        this.points = 0;
    }

    makeGuess(guess: number): void {
        this.currentGuess = guess;
    }

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

    addPoints(amount: number): void {
        this.points += amount;
        }

    reset(): void {
        this.currentGuess = null;
    }

}
