import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameParamsComponent } from '@pages/game/game-params/game-params.component';
import { GamePlayComponent } from '@pages/game/game-play/game-play.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamePlayersComponent } from '@pages/game/game-players/game-players.component';
import { SharedModule } from '@shared/shared.module';


const routes: Routes = [
  {path: 'params', component: GameParamsComponent, pathMatch: 'full'},
  {path: 'players', component: GamePlayersComponent, pathMatch: 'full'},
  {path: 'play', component: GamePlayComponent, pathMatch: 'full'},
  {path: 'test', component: GamePlayComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'params', pathMatch: 'full'}
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
  ]
})
export class GameModule {
}
