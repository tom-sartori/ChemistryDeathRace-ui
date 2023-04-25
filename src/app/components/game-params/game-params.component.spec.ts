import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameParamsComponent } from './game-params.component';

describe('GameParamsComponent', () => {
  let component: GameParamsComponent;
  let fixture: ComponentFixture<GameParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
