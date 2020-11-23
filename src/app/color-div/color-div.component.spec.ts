import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDivComponent } from './color-div.component';

describe('ColorDivComponent', () => {
  let component: ColorDivComponent;
  let fixture: ComponentFixture<ColorDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
