import { Component, OnInit } from '@angular/core';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public homeLink: string = `./${AppConstants.ROUTES.HOME}`;
  public aboutLink: string = `./${AppConstants.ROUTES.ABOUT}`;
  public gameParamsLink: string = `./${AppConstants.ROUTES.GAME_PARAMS}`;

  constructor() {
  }

  ngOnInit(): void {
  }

}
