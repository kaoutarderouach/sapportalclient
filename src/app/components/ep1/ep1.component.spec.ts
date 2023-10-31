import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ep1Component } from './ep1.component';

describe('Ep1Component', () => {
  let component: Ep1Component;
  let fixture: ComponentFixture<Ep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
