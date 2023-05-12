import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '@services/question.service';
import { Router } from '@angular/router';
import { defaultDiceSize, defaultNumberOfPlayer, maxNumberOfPlayer } from '@ui-constants/game-constants';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'app-game-params',
  templateUrl: './game-params.component.html',
  styleUrls: ['./game-params.component.scss']
})
export class GameParamsComponent implements OnInit {
  mainForm!: FormGroup;

  difficulties: string[] = [];
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private questionService: QuestionService,
              private router: Router) {
  }

  // Init the page
  ngOnInit(): void {
    this.loading = true;
    this.questionService.getAvailableDifficulties().subscribe(x => { // Get the difficulties from the API
      this.difficulties = x;
      this.loading = false;
    });
    this.mainForm = this.formBuilder.group({ // Init the form
      playersNumber: [defaultNumberOfPlayer, [Validators.required, Validators.max(maxNumberOfPlayer), Validators.min(1)]],
      diceSize: [defaultDiceSize, Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  // Function to get information from the form and go to the next page
  goToPlayersName() {
    this.questionService.getQuestionsByDifficulty(this.mainForm.get("difficulty")!.value).subscribe(x => {
      localStorage.setItem(AppConstants.LOCAL_STORAGE.GAME_PARAMS, JSON.stringify({
        playersNumber: this.mainForm.get("playersNumber")!.value,
        diceSize: this.mainForm.get("diceSize")!.value,
        difficulty: this.mainForm.get("difficulty")!.value,
        questions: x
      }));
      this.router.navigateByUrl(AppConstants.ROUTES.GAME_PLAYERS);
    });
  }

  // Functions to increase the number of players
  increasePlayersNumber() {
    if (this.mainForm.get("playersNumber")!.value < 4) {
      this.mainForm.get("playersNumber")!.setValue(this.mainForm.get("playersNumber")!.value + 1);
    }
  }

  // Functions to decrease the number of players
  decreasePlayersNumber() {
    if (this.mainForm.get("playersNumber")!.value > 1) {
      this.mainForm.get("playersNumber")!.setValue(this.mainForm.get("playersNumber")!.value - 1);
    }
  }

  // Functions to increase the dice size
  increaseDiceSize() {
    if (this.mainForm.get("diceSize")!.value < 9) {
      this.mainForm.get("diceSize")!.setValue(this.mainForm.get("diceSize")!.value + 1);
    }
  }

  // Functions to decrease the dice size
  decreaseDiceSize() {
    if (this.mainForm.get("diceSize")!.value > 3) {
      this.mainForm.get("diceSize")!.setValue(this.mainForm.get("diceSize")!.value - 1);
    }
  }

  // Function to go back to the home page
  goToHome() {
    this.router.navigateByUrl(AppConstants.ROUTES.HOME)
  }
}
