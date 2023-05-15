import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameParamsComponent } from '@pages/game/game-params/game-params.component';
import { GamePlayComponent } from '@pages/game/game-play/game-play.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamePlayersComponent } from '@pages/game/game-players/game-players.component';
import { SharedModule } from '@shared/shared.module';
import { AppConstants } from '@app/app.constants';
import { GameService } from '@services/game.service';


const routes: Routes = [
  {path: AppConstants.ROUTES.PARAMS, component: GameParamsComponent, pathMatch: 'full'},
  {path: AppConstants.ROUTES.PLAYERS, component: GamePlayersComponent, pathMatch: 'full'},
  {path: AppConstants.ROUTES.PLAY, component: GamePlayComponent, pathMatch: 'full'},
  {path: AppConstants.ROUTES.TEST, component: GamePlayComponent, pathMatch: 'full'},
  {path: AppConstants.ROUTES.TEST + '/:firstMove', component: GamePlayComponent, pathMatch: 'full'},
  {path: '', redirectTo: AppConstants.ROUTES.PARAMS, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    GameParamsComponent,
    GamePlayComponent,
    GamePlayersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    GameService
  ]
})
export class GameModule {
}
