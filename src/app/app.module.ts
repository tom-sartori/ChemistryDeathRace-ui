import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '@app/app-routing.module';
import { ParamsService } from '@services/params.service';
import { SharedModule } from '@shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  exports: [
    AppRoutingModule,
  ],
  providers: [
    ParamsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
