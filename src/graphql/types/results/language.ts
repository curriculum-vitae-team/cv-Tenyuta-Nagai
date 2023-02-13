import { ILanguage } from '../../../interfaces/ILanguage.interface';

export interface ILanguagesReturn {
  languages: ILanguage[];
}

export type CreateLanguageResult = {
  createLanguage: ILanguage;
};
