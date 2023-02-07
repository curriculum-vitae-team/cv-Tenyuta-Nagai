import { ISkill } from './../../../../interfaces/ISkill.interface';

export function getAllSkills(skills: ISkill[]) {
  return skills?.map((skill) => ({
    id: skill?.id,
    name: skill?.name || '',
  }));
}
