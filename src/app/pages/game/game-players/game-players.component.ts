import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ParamsService } from '@services/params.service';
import { Router } from '@angular/router';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.scss']
})
export class GamePlayersComponent implements OnInit {

  mainForm!: FormGroup;

  private playersNumber!: number;
  playersName: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private paramsService: ParamsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.playersNumber = this.paramsService.playersNumber;
    this.initMainForm();
  }

  private initMainForm() {
    this.mainForm = this.formBuilder.group({});
    for (let i = 0; i < this.playersNumber; i++) {
      this.playersName.push('');
      this.mainForm.addControl(`player${i + 1}`, this.formBuilder.control('', Validators.required));
    }
    this.mainForm.setValidators(this.differentNamesValidator());
  }

  differentNamesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let names: string[] = [];
      for (let i = 0; i < this.playersNumber; i++) {
        names.push(control.get(`player${i + 1}`)!.value);
      }
      let uniqueNames = names.filter((v, i, a) => a.indexOf(v) === i);
      return uniqueNames.length === this.playersNumber ? null : {'differentNames': {value: control.value}};
    };
  }

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

  goToGame() {
    for (let i = 0; i < this.playersNumber; i++) {
      this.playersName[i] = this.mainForm.get(`player${i + 1}`)!.value;
    }
    this.paramsService.playerNames = this.playersName;
    this.router.navigateByUrl(AppConstants.ROUTES.GAME_PLAY);
  }

  goToParams() {
    this.router.navigateByUrl(AppConstants.ROUTES.GAME_PARAMS)
  }
}
