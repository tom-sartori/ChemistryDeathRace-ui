import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimTestComponent } from './zim-test.component';

describe('ZimTestComponent', () => {
  let component: ZimTestComponent;
  let fixture: ComponentFixture<ZimTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZimTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZimTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
