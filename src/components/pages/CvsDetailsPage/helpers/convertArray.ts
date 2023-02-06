import { ILanguageProficiency } from '../../../../interfaces/ILanguageProficiency.interface';
import { ISkillMastery } from '../../../../interfaces/ISkillMastery.interface';

export const convertSkillsArray = (array: ISkillMastery[]) => {
  return array.reduce((acc, { skill_name }, index) => {
    if (index === array.length - 1) {
      acc += skill_name;
    } else {
      acc += `${skill_name}, `;
    }
    return acc;
  }, '');
};

export const convertLanguagesArray = (array: ILanguageProficiency[]) => {
  return array.reduce((acc, { language_name }, index) => {
    if (index === array.length - 1) {
      acc += language_name;
    } else {
      acc += `${language_name}, `;
    }
    return acc;
  }, '');
};
