import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLanguageSelectorComponent } from './app-language-selector.component';

describe('AppLanguageSelectorComponent', () => {
  let component: AppLanguageSelectorComponent;
  let fixture: ComponentFixture<AppLanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLanguageSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
