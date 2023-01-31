import { ILanguageProficiency } from './ILanguageProficiency.interface';
import { ISkillMastery } from './ISkillMastery.interface';

export interface IProfile {
  id: string;
  created_at: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar?: string;
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
}

export interface IProfileInput {
  first_name: string;
  last_name: string;
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
}
