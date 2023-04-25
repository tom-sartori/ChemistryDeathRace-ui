import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { AboutComponent } from '@components/about/about.component';
import { GameParamsComponent } from '@components/game-params/game-params.component';
import { PlayersNameComponent } from '@components/players-name/players-name.component';
import { ZimTestComponent } from '@app/zim-test/zim-test.component';
import { ErrorComponent } from '@components/error/error.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'game-params', component: GameParamsComponent},
  {path: 'players-name', component: PlayersNameComponent},
  {path: 'game-test', component: ZimTestComponent},
  {path: 'game', component: ZimTestComponent},
  {path: 'error404', component: ErrorComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
