export class Game {
    public players: string[] = [];
    public playerImages: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public takeCardAnimation = false;
    public currentCard: string = "";

    constructor() {
        for (let index = 1; index < 14; index++) {
            this.stack.push('spade_' + index);
            this.stack.push('hearts_' + index);
            this.stack.push('diamonds_' + index);
            this.stack.push('clubs_' + index);
        }

        shuffle(this.stack);
    }

    public editGametoJSON(){
        return {
            players: this.players,
            playerImages: this.playerImages,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            takeCardAnimation: this.takeCardAnimation
        }
    }
}

function shuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}