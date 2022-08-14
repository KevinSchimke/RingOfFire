import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, onSnapshot, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard?: string = '';
  game = new Game();
  games$?: Observable<any>;
  gameID: string = '';

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.gameID = params['id'];

      /*
      Collection ID 

      D8bTKKk4B5iJOjAj83tB - Spiel Database

      MNnqgPoO57cyKawYYz9I - Test Database

      bEYIotJ3Dd3pxjLxIcJQ - Test Database

      */

      /*Funktioniert*/
      onSnapshot(doc(this.firestore, 'games', params['id']), (doc) => {
        const loadFirebaseGame: any = doc.data();
        console.log('Firestore game onSnapshot', loadFirebaseGame);
      });

      /*Zeigt nicht das gewünschte Json an*/
      const coll = doc(this.firestore, 'games', params['id']);
      console.log('Firestore game doc', coll);

      /*Funktioniert läd aber alle dokumente und nicht mit der gameID*/
      const allColl = collection(this.firestore, 'games');
      this.games$ = collectionData(allColl);
      this.games$.subscribe((game) => {
        console.log('Firestore game Collection', game);
      });

    });

    /*Funktioniert - neue Collection wird angelegt*/

    // const coll = collection(this.firestore, 'games');
    // setDoc(doc(coll), {name: this.game.editGametoJSON()});
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