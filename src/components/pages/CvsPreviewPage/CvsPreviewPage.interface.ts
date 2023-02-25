import { ILanguageProficiency } from '../../../interfaces/ILanguageProficiency.interface';
import { ISkillMastery } from '../../../interfaces/ISkillMastery.interface';
import { IUser } from '../../../interfaces/IUser.interface';
import { IProject } from './../../../interfaces/IProject.interface';

export interface ICvPreviewProps {
  data: {
    name: string;
    languages: ILanguageProficiency[];
    projects: IProject[];
    skills: ISkillMastery[];
    user: IUser;
  };
  isVisible?: boolean;
}
