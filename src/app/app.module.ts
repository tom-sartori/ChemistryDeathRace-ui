import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { ZimTestComponent } from '@app/zim-test/zim-test.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { HeaderComponent } from '@components/header/header.component';
import { AboutComponent } from '@components/about/about.component';
import { GameParamsComponent } from '@components/game-params/game-params.component';
import { PlayersNameComponent } from '@components/players-name/players-name.component';
import { ErrorComponent } from '@components/error/error.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { ParamsService } from '@services/params.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NextComponent } from '@components/buttons/next/next.component';
import { PrevComponent } from '@components/buttons/prev/prev.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NoopAnimationsModule,
    MatTooltipModule
  ],
  exports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ParamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
