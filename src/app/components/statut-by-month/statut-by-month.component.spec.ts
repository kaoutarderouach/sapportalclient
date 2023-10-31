import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutByMonthComponent } from './statut-by-month.component';

describe('StatutByMonthComponent', () => {
  let component: StatutByMonthComponent;
  let fixture: ComponentFixture<StatutByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatutByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
