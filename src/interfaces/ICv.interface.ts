import { ILanguageProficiency } from './ILanguageProficiency.interface';
import { IProject } from './IProject.interface';
import { ISkillMastery } from './ISkillMastery.interface';
import { IUser } from './IUser.interface';

export interface ICv {
  id: string;
  created_at: string;
  name: string;
  description: string;
  user?: Omit<IUser, 'cvs'>;
  projects?: IProject[];
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
  is_template: boolean;
}

export interface ICvResult {
  updateCv: ICv;
}
