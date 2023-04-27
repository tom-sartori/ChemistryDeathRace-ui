import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from '@app/app.constants';

const routes: Routes = [
  {path: AppConstants.ROUTES.HOME, redirectTo: '', pathMatch: 'full'},
  {path: AppConstants.ROUTES.ABOUT, loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule)},
  {path: AppConstants.ROUTES.GAME, loadChildren: () => import('@pages/game/game.module').then(m => m.GameModule)},
  {
    path: AppConstants.ROUTES.NOT_FOUND,
    loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {path: '', loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)},
  {path: '**', redirectTo: AppConstants.ROUTES.NOT_FOUND}
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
