import { Component, OnInit } from '@angular/core';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public gameParamsLink: string = `./${AppConstants.ROUTES.GAME_PARAMS}`;

  constructor() {
  }

  ngOnInit(): void {
  }

}
