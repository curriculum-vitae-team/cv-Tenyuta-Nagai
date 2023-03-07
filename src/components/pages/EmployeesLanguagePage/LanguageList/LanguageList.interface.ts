import { ILanguageProficiency } from './../../../../interfaces/ILanguageProficiency.interface';

export interface ILanguagesListProps {
  data: ILanguageProficiency[];
  handleDelete: (skill: ILanguageProficiency) => void;
  isVisible: boolean;
}
