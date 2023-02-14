import { ISkillMastery } from './../../../../interfaces/ISkillMastery.interface';

export interface ISkillsListProps {
  data: ISkillMastery[];
  handleDelete: (skill: unknown) => void;
}

export interface IChipStyled {
  mastery?: string;
}
