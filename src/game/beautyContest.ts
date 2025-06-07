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

    public calculateTarget(): number {
        const guesses = this.players.map(playerT => playerT.getCurrentGuess()).filter(guessT => guessT !== null) as number[];
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
            const diff = Math.abs(guess! - this.target);
            if (diff < closestDiff) {
                closestDiff = diff;
                winner = player;
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
            counter[guess!] = (counter[guess!] || 0) + 1;
            return counter;
        }, {} as Record<number, number>);

        const winnerGuess = winner.getCurrentGuess();
        const winnerGuessCount = count[winnerGuess!];

        if (winnerGuessCount > 1) {
            for (const player of this.players) {
                player.addPoints(-1);
            }
            return;
        }

        if (Math.round(winnerGuess!) === exact) {
            for (const player of this.players) {
                if (player !== winner) {
                    player.addPoints(-1);
                }
            }
            return;
        }

        for (const player of this.players) {
            if (player !== winner) {
                player.addPoints(-1);
            }
        }
    }
}
