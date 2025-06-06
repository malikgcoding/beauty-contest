import { Gui } from './gui/index';
import { Server } from './multiplayer/server';
import { BeautyContest } from './game/beautyContest';

const gui = new Gui();
const server = new Server(3000);
const game = new BeautyContest();

function startGame() {
    server.start();
    gui.displayWelcomeMessage();
    game.start();
}

startGame();