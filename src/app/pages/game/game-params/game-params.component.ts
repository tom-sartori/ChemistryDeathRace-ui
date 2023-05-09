import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamsService } from '@services/params.service';
import { QuestionService } from '@services/question.service';
import { Router } from '@angular/router';
import { maxNumberOfPlayer } from '@ui-constants/game-constants';
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
              private paramsService: ParamsService,
              private questionService: QuestionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.questionService.getAvailableDifficulties().subscribe(x => {
      this.difficulties = x;
      this.paramsService.difficulty = x[0];
      this.loading = false;
    });
    this.mainForm = this.formBuilder.group({
      playersNumber: [this.paramsService.playersNumber, [Validators.required, Validators.max(maxNumberOfPlayer), Validators.min(1)]],
      diceSize: [this.paramsService.diceSize, Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  goToPlayersName() {
    this.paramsService.playersNumber = this.mainForm.get("playersNumber")!.value;
    this.paramsService.diceSize = this.mainForm.get("diceSize")!.value;
    this.paramsService.difficulty = this.mainForm.get("difficulty")!.value;
    this.questionService.getQuestionsByDifficulty(this.mainForm.get("difficulty")!.value).subscribe(x => {
      this.paramsService.questions = x;
      this.router.navigateByUrl(AppConstants.ROUTES.GAME_PLAYERS)
    });
  }

  increasePlayersNumber() {
    if (this.mainForm.get("playersNumber")!.value < 4) {
      this.mainForm.get("playersNumber")!.setValue(this.mainForm.get("playersNumber")!.value + 1);
    }
  }

  decreasePlayersNumber() {
    if (this.mainForm.get("playersNumber")!.value > 1) {
      this.mainForm.get("playersNumber")!.setValue(this.mainForm.get("playersNumber")!.value - 1);
    }
  }

  increaseDiceSize() {
    if (this.mainForm.get("diceSize")!.value < 9) {
      this.mainForm.get("diceSize")!.setValue(this.mainForm.get("diceSize")!.value + 1);
    }
  }

  decreaseDiceSize() {
    if (this.mainForm.get("diceSize")!.value > 3) {
      this.mainForm.get("diceSize")!.setValue(this.mainForm.get("diceSize")!.value - 1);
    }
  }

  goToHome() {
    this.router.navigateByUrl(AppConstants.ROUTES.HOME)
  }
}
