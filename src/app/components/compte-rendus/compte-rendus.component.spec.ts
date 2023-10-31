import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteRendusComponent } from './compte-rendus.component';

describe('CompteRendusComponent', () => {
  let component: CompteRendusComponent;
  let fixture: ComponentFixture<CompteRendusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteRendusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteRendusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
