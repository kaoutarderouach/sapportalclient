import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './app-language-selector.component.html',
  styleUrls: ['./app-language-selector.component.css'],
})
export class LanguageSelectorComponent {
  constructor(private translocoService: TranslocoService) {}

  public languagesList: Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
    {
      imgUrl: '/assets/images/English.png',
      code: 'en',
      name: 'English',
      shorthand: 'EN',
    },
    {
      imgUrl: '/assets/images/French.png',
      code: 'fr',
      name: 'Français',
      shorthand: 'FR',
    },
  ];

  public selectedLanguageCode: string | null = null;

  public changeLanguage(languageCode: string): void {
    this.selectedLanguageCode = languageCode;
    this.translocoService.setActiveLang(languageCode);

    // Votre code supplémentaire ici si nécessaire
  }
}
