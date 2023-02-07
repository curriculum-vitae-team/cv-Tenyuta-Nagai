import { ISkillMastery } from '../interfaces/ISkillMastery.interface';

export const createArrayForSkills = (data: ISkillMastery[] | undefined) => {
  if (!data) {
    return [];
  }

  return data.map(({ skill_name, mastery }) => {
    return { skill_name, mastery };
  });
};
