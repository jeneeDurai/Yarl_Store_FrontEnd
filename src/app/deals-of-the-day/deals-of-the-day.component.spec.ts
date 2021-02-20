import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsOfTheDayComponent } from './deals-of-the-day.component';

describe('DealsOfTheDayComponent', () => {
  let component: DealsOfTheDayComponent;
  let fixture: ComponentFixture<DealsOfTheDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsOfTheDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
