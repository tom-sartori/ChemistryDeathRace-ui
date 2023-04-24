import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamsService } from '../../services/params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players-name',
  templateUrl: './players-name.component.html',
  styleUrls: ['./players-name.component.scss']
})
export class PlayersNameComponent implements OnInit {

  mainForm!: FormGroup;

  private playersNumber!: number;
  playersName: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private paramsService: ParamsService,
              private router: Router) { }

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
  }

  goToGame() {
    for (let i = 0; i < this.playersNumber; i++) {
      this.playersName[i] = this.mainForm.get(`player${i + 1}`)!.value;
    }
    this.paramsService.playersName = this.playersName;
    this.router.navigate(['/game']);
  }

  goToParams() {
    this.router.navigate(['/game-params']);
  }
}
