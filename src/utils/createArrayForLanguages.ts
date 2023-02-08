import { ILanguageProficiency } from '../interfaces/ILanguageProficiency.interface';

export const createArrayForLanguages = (data: ILanguageProficiency[] | undefined) => {
  if (!data) {
    return [];
  }

  return data.map(({ language_name, proficiency }) => {
    return { language_name, proficiency };
  });
};
