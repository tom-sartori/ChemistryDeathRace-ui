import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextComponent } from '@shared/buttons/next/next.component';
import { PrevComponent } from '@shared/buttons/prev/prev.component';
import { HeaderComponent } from '@shared/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PrevComponent,
    NextComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    HeaderComponent,
    PrevComponent,
    NextComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SpinnerComponent
  ]
})
export class SharedModule {
}
