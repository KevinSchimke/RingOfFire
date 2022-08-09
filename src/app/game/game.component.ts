import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard?: string = ''; //Kevin edit from currentCard: string = ''; to currentCard?: string = ''; undefined
  game!: Game; // Kevin edit from game: Game; to game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.takeCardAnimation) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.takeCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard + ''); // Kevin is not a string
        this.takeCardAnimation = false;
      }, 1000);
    }


  }
}
