import { ILanguageProficiency } from '../../../interfaces/ILanguageProficiency.interface';
import { ISkillMastery } from '../../../interfaces/ISkillMastery.interface';

export interface IProfileInput {
  first_name: string;
  last_name: string;
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
}
