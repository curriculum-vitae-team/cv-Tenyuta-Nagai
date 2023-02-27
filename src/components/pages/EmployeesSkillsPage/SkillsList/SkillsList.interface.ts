import { ISkillMastery } from './../../../../interfaces/ISkillMastery.interface';

export interface ISkillsListProps {
  data: ISkillMastery[];
  handleDelete: (skill: ISkillMastery) => void;
  isVisible: boolean;
}

export interface IChipStyled {
  mastery?: string;
}
