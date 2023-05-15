import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '@app/app.constants';
import { pawnColors } from '@ui-constants/ui-constants';
import { forEach } from 'lodash';
import { GameService } from '@services/game.service';

@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.scss']
})
export class GamePlayersComponent implements OnInit {

  public mainForm!: FormGroup;
  public playersName: string[];
  public playersColor: string[];
  public loading: boolean;

  private localStorage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameService: GameService
  ) {
    this.playersName = [];
    this.playersColor = [];
    this.loading = false;
    forEach(pawnColors, (value: GradientColor) => { // Get the colors of each pawn from the constants
      this.playersColor.push(value.toString());
    });
  }

  // Init the page
  ngOnInit(): void {
    this.localStorage = JSON.parse(localStorage.getItem(AppConstants.LOCAL_STORAGE.GAME_PARAMS) || '{}');
    if (!this.localStorage.playersNumber) { // If the user try to access the page without set the number of players before
      this.router.navigateByUrl(AppConstants.ROUTES.GAME_PARAMS);
    }
    else {
      this.initMainForm();
    }
  }

  // Function to init the form
  private initMainForm() {
    this.mainForm = this.formBuilder.group({});
    for (let i = 0; i < this.localStorage.playersNumber; i++) {
      this.playersName.push('');
      this.mainForm.addControl(`player${i + 1}`, this.formBuilder.control('', Validators.required));
    }
    this.mainForm.setValidators(this.differentNamesValidator());
  }

  // Validator to check if the players name are different
  differentNamesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let names: string[] = [];
      for (let i = 0; i < this.localStorage.playersNumber; i++) {
        names.push(control.get(`player${i + 1}`)!.value);
      }
      let uniqueNames = names.filter((v, i, a) => a.indexOf(v) === i);
      return uniqueNames.length === this.localStorage.playersNumber ? null : {'differentNames': {value: control.value}};
    };
  }

  // Function to get the error message from the form
  getErrorMessage(): string {
    if (this.mainForm.hasError('differentNames') && this.mainForm.dirty) {
      return 'Les noms des joueurs doivent être différents';
    }
    else if (this.mainForm.hasError('required')) {
      return 'Vous devez remplir tous les champs';
    }
    else {
      return '';
    }
  }

  // Function save the players name and launch the game
  goToGame() {
    for (let i = 0; i < this.localStorage.playersNumber; i++) {
      this.playersName[i] = this.mainForm.get(`player${i + 1}`)!.value;
    }

    this.localStorage.playerNames = this.playersName;
    localStorage.setItem(AppConstants.LOCAL_STORAGE.GAME_PARAMS, JSON.stringify(this.localStorage));

    this.loading = true;
    this.gameService.createNewGame(this.localStorage.playersNumber, this.localStorage.difficulty, this.localStorage.diceSize).subscribe((game) => {
      localStorage.setItem(AppConstants.LOCAL_STORAGE.GAME, JSON.stringify(game));
      this.loading = false;
      this.router.navigateByUrl(AppConstants.ROUTES.GAME_PLAY);
    });
  }

  // Function to go back to game params
  goToParams() {
    this.router.navigateByUrl(AppConstants.ROUTES.GAME_PARAMS)
  }
}
