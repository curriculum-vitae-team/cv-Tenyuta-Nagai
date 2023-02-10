import { ISkill } from './../../../interfaces/ISkill.interface';
export interface ISkillsReturn {
  skills: ISkill[];
}

export type CreateSkillsResult = {
  createSkill: ISkill;
};
