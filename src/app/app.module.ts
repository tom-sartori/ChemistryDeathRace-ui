import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ZimTestComponent } from './zim-test/zim-test.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { GameParamsComponent } from './components/game-params/game-params.component';
import { PlayersNameComponent } from './components/players-name/players-name.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { ParamsService } from './services/params.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NextComponent } from './components/buttons/next/next.component';
import { PrevComponent } from './components/buttons/prev/prev.component';

@NgModule({
  declarations: [
    AppComponent,
    ZimTestComponent,
    HomePageComponent,
    HeaderComponent,
    AboutComponent,
    GameParamsComponent,
    PlayersNameComponent,
    ErrorComponent,
    NextComponent,
    PrevComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ParamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
