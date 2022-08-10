import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard?: string = '';
  game =  new Game();

  constructor() { }

  ngOnInit(): void {
    console.log(this.game);
  }

  takeCard() {
    if (!this.takeCardAnimation) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.takeCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard + '');
        this.takeCardAnimation = false;
      }, 1000);
    }
  }
}
