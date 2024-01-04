import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysByMonthComponent } from './sys-by-month.component';

describe('SysByMonthComponent', () => {
  let component: SysByMonthComponent;
  let fixture: ComponentFixture<SysByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
