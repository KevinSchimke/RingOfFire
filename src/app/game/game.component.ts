import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard?: string = '';
  game = new Game();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.game);
  }

  takeCard() {
    if (!this.takeCardAnimation && this.game.players.length >= 1) {
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard + '');
        this.takeCardAnimation = false;
      }, 1000);
    } else {
      alert("Please Add a Player");
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}