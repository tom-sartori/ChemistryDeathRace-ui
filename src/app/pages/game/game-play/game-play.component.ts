import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '@models/question/question.model';
import { backgroundColor, images } from '@ui-constants/ui-constants';
import { Game } from '@ui-classes/game';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const questions: Question[] = [{
      "id": "64490e28b152c1016a10b16e",
      "category": "Catégorie 1",
      "difficulty": "Test",
      "name": "Question 1",
      "propositions": [{"answer": true, "name": "Oui"}, {"answer": false, "name": "Non"}]
    }, {
      "id": "64490e4e40e7dc4817d27f8c",
      "category": "Catégorie 2",
      "difficulty": "Test",
      "name": "Question 2",
      "propositions": [{"answer": true, "name": "Oui"}, {"answer": false, "name": "Non"}]
    }, {
      "id": "64490e6903f23863160746ba",
      "category": "Catégorie 3",
      "difficulty": "Test",
      "name": "Question 3",
      "propositions": [{"answer": true, "name": "Oui"}, {"answer": false, "name": "Non"}]
    }, {
      "id": "64490e7d03f23863160746bb",
      "category": "Catégorie 4",
      "difficulty": "Test",
      "name": "Question 4",
      "propositions": [{"answer": true, "name": "Oui"}, {"answer": false, "name": "Non"}]
    }, {
      "id": "64491265b89cfe0f175c4423",
      "category": "Catégorie 5",
      "difficulty": "Test",
      "name": "Question 5",
      "propositions": [{"answer": true, "name": "Oui"}, {"answer": false, "name": "Non"}]
    }, {
      "id": "64491288bde5e51b206dafaa",
      "category": "Catégorie 6",
      "difficulty": "Test",
      "name": "Question 6",
      "propositions": [{"answer": true, "name": "Oui"}, {"answer": false, "name": "Non"}]
    }]

    const assets = [
      {font: AppConstants.FONT.NAME, src: AppConstants.FONT.PATH},
      "logos/logo_game.png", "logos/logo_enscm.png", "logos/logo_um.png",
    ].concat(images);

    if (this.router.url === '/game/play') {

      if (localStorage.getItem(AppConstants.LOCAL_STORAGE.GAME_PARAMS)) {
        try {
          const params = JSON.parse(localStorage.getItem(AppConstants.LOCAL_STORAGE.GAME_PARAMS)!);

          new Frame({
            scaling: FULL,
            color: backgroundColor,
            outerColor: backgroundColor,
            assets,
            path: "assets/images/",
            ready: (): void => {
              new Game(params.playerNames, params.questions, params.diceSize);
            }
          });
        } catch (e) {
          this.router.navigate(['/game/params']);
        }
      }
      else {
        this.router.navigate(['/game/params']);
      }
    }
    else {
      let firstMove: number | undefined = parseInt(this.route.snapshot.paramMap.get('firstMove')!);
      new Frame({
        scaling: FULL,
        color: backgroundColor,
        outerColor: backgroundColor,
        assets,
        path: "assets/images/",
        ready: (): void => {
          let game = new Game(['Jean', 'Michel', 'Denis', 'Henry'], questions, 99);
          if (firstMove) {
            game.onDiceChanged(firstMove);
          }
        }
      });
    }
  }

  ngOnInit(): void {
  }
}
