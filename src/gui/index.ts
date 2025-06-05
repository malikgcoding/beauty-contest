export class Gui {
    constructor() {
        this.init();
    }

    init(): void {
        console.log("GUI initialized");
    }

    displayPrompt(message: string): void {
        console.log(message);
    }

    receiveInput(callback: (input: string) => void): void {
        const userInput = prompt("Enter your guess:");
        callback(userInput ?? "");
    }

    showResult(result: string): void {
        console.log(result);
    }

    displayWelcomeMessage(): void {
        console.log("Welcome to the Beauty Contest Game!");
    }
}
