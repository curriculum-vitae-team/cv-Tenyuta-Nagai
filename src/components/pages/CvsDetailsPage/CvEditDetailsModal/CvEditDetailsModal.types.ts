import { ICvQueryResult } from '../../../../graphql/types/results/cv';

export interface ICvEditModalProps {
  open: boolean;
  onClose: () => void;
  cvData: ICvQueryResult;
}

export interface IFormEditDetailsCv {
  [key: string]: string | boolean;
  name: string;
  description: string;
  template: boolean;
}
