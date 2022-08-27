import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  inputGameID: string= "";
  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    let game = new Game();
    let date = new Date();
    game.gameTimeStamp = date.toString();
    
    this.firestore
      .collection('games')
      .add(game.editGametoJSON())
      .then((gameInfo: any) => {
        this.router.navigate(['/game/' + gameInfo.id]);
      })
  }

  checkGameID(event: any){
    this.inputGameID = event.target.value;
  }

  openInputGame(){
    if(this.inputGameID.length == 20){
      this.router.navigate(['/game/' + this.inputGameID]);
    }else {
      alert("Die eingegebene ID ist falsch");
    }
    
  }
}
