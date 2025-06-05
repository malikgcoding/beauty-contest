import { Gui } from './gui/index';
import { Server } from './multiplayer/server';
import { BeautyContest } from './game/beautyContest';

// Initialize the main components of the application
const gui = new Gui();
const server = new Server(3000);
const game = new BeautyContest();

// Bootstrap the application
function startGame() {
    server.start();
    gui.displayWelcomeMessage();
    game.start();
}

startGame();