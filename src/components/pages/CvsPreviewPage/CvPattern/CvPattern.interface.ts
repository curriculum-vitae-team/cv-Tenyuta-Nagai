import { ILanguageProficiency } from '../../../../interfaces/ILanguageProficiency.interface';
import { IProject } from '../../../../interfaces/IProject.interface';
import { ISkillMastery } from '../../../../interfaces/ISkillMastery.interface';
import { IUser } from '../../../../interfaces/IUser.interface';

export interface ICvPatternProps {
  data: {
    name: string;
    languages: ILanguageProficiency[];
    projects: IProject[];
    skills: ISkillMastery[];
    user: IUser;
  };
}
