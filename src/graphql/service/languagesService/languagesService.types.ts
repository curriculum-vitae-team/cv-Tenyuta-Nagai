import { ReactiveVar } from '@apollo/client';
import { Languages } from '../../../constants/languages';

export type TLang = Languages.EN | Languages.RU;

export interface ILanguageService {
  lang$: ReactiveVar<string>;
  setLanguage: (value: TLang) => void;
}
