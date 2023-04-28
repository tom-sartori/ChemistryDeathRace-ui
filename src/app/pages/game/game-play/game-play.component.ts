import { Component, OnInit } from '@angular/core';
import { ParamsService } from '@services/params.service';
import { Router } from '@angular/router';
import { Question } from '@models/question/question.model';
import { backgroundColor } from '@constants/ui-constants';
import { Game } from '@classes/game';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  constructor(
    private paramsService: ParamsService,
    private router: Router
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

    if (this.router.url === '/game/test') {
      new Frame({
        scaling: FULL,
        color: backgroundColor,
        outerColor: backgroundColor,
        assets: {font: "Freckle Face", image: "src/assets/fonts/Freckle_Face/FreckleFace-Regular.ttf"},
        ready: (): void => {
          new Game(['Jean', 'Michel', 'Denis', 'Henry'], questions, 99);
        }
      });
    }
    else {
      new Frame({
        scaling: FULL,
        color: backgroundColor,
        outerColor: backgroundColor,
        assets: {font: "Freckle Face", image: "src/assets/fonts/Freckle_Face/FreckleFace-Regular.ttf"},
        ready: (): void => {
          new Game(paramsService.playerNames, paramsService.questions, paramsService.diceSize);
        }
      });
    }
  }

  ngOnInit(): void {
  }
}
