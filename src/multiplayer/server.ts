import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { Player } from '../game/player';
import { GameState } from '../types';
import { BeautyContest } from '../game/beautyContest';
import readline from 'readline';

export class Server {
    private app: express.Express;
    private server: ReturnType<typeof createServer>;
    private io: SocketServer;
    private players: Map<string, Player>;
    private state: GameState;
    private game: BeautyContest;

    constructor(port: number) {
        this.app = express();
        this.server = createServer(this.app);
        this.io = new SocketServer(this.server);
        this.players = new Map();
        this.game = new BeautyContest();
        this.state = {
            players: [],
            currentRound: 1,
            target: 0,
            gameOver: false
        };
        
        this.app.use(express.static('public'));

        this.setupSocketListeners();
        this.setupConsoleCommands();
        this.server.listen(port, () => {
            console.log(`Server is running on http://127.0.0.1:${port}`);
        });
    }

    public start() {
        this.state = {
            players: [],
            currentRound: 1,
            target: 0,
            gameOver: false
        };
        this.players.forEach(player => player.reset());
        this.game.start();
        this.io.emit('gameStarted', this.state);
    }

    private setupSocketListeners() {
        this.io.on('connection', (socket) => {
            console.log(`Player connected! ${socket.id}`);

            socket.on('register', (playerName: string) => {
                const player = new Player(playerName);
                this.players.set(socket.id, player);
                this.game.newPlayer(player);
                socket.emit('registered', { name: player.getName() });
            });

            socket.on('makeGuess', (guess: number) => {
                const player = this.players.get(socket.id);
                if (player) {
                    this.game.handleGuess(player, guess);

                    if (this.game.guessed()) {
                        const target = this.game.calculateTarget();
                        this.state.target = target;

                        const winner = this.game.winner();

                        this.game.updatePoints();

                        this.io.emit('gameResult', {
                            winner: winner ? winner.getName() : null,
                            target,
                            guesses: Array.from(this.players.values()).map(p => ({
                            name: p.getName(),
                            guess: p.getCurrentGuess(),
                            points: p.getPoints()
                        }))
                        });

                        this.players.forEach(playerT => playerT.reset());
                        this.game.start();
                        this.state.currentRound += 1;
                        this.state.gameOver = true;
                    } else {
                        this.io.emit('stateUpdate', this.state);
                    }
                }
            });

            socket.on('disconnect', () => {
                this.players.delete(socket.id);
                console.log(`Player disonnected! ${socket.id}`);
            });
        });
    }

    private setupConsoleCommands() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (input) => {
            const [command, ...args] = input.trim().split(' ');
            if (command === 'list') {
                const playerNames = Array.from(this.players.values()).map(p => p.getName());
                console.log('Players:', playerNames.length ? playerNames.join(', ') : 'No players connected');
            } else if (command === 'kick') {
                const name = args.join(' ');
                let found = false;
                for (const [socketId, player] of this.players.entries()) {
                    if (player.getName() === name) {
                        this.players.delete(socketId);
                        this.io.to(socketId).emit('disqualified');
                        this.io.sockets.sockets.get(socketId)?.disconnect(true);
                        console.log(`Player "${name}" disqualified`);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    console.log(`Player "${name}" not found`);
                }
            } else {
                console.log('Unknown command');
            }
        });
    }
}
