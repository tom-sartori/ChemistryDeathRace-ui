import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)},
  {path: 'about', loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule)},
  {path: 'game', loadChildren: () => import('@pages/game/game.module').then(m => m.GameModule)},
  {path: 'not-found', loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
