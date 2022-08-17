import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  game: Game;
  gameID: string = '';

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameID = params['id']
      this.firestore.
        collection('games')
        .doc(this.gameID)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.takeCardAnimation = game.takeCardAnimation;
        })
    })


  }

  newGame() {
    this.game = new Game();
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameID)
      .update(this.game.editGametoJSON())
  }

  takeCard() {
    if (!this.game.takeCardAnimation && this.game.players.length >= 1) {
      this.game.currentCard = this.game.stack.pop();
      this.game.takeCardAnimation = true;


      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard + '');
        this.game.takeCardAnimation = false;
        this.saveGame();
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
        this.saveGame();
      }
    });
  }
}