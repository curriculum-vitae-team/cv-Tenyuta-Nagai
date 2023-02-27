import { makeVar } from '@apollo/client';
import { Languages } from '../../../constants/languages';
import { ILanguageService, TLang } from './languagesService.types';

class LanguageService implements ILanguageService {
  lang$ = makeVar(localStorage.getItem('lang') || Languages.EN);

  setLanguage(value: TLang) {
    this.lang$(value);
    localStorage.setItem('lang', value);
  }
}

export const languageService = new LanguageService();
