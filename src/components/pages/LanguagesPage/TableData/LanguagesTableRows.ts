import { ILanguage } from './../../../../interfaces/ILanguage.interface';

export function getAllLanguages(languages: ILanguage[]) {
  return languages?.map((language) => ({
    id: language?.id,
    name: language?.name || '',
    iso2: language?.iso2 || '',
  }));
}
