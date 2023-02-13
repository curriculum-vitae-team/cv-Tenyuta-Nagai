import { IUserAllResult } from '../../../../graphql/types/results/user';
import { ICvData } from '../EmployeesCVsPage.types';

export type TCvId = {
  id: string;
};

export interface ICvEditModalProps {
  open: boolean;
  onClose: (data?: ICvData) => void;
  userData: IUserAllResult;
  cvId: string;
}

export interface IFormEditCv {
  [key: string]: string | boolean;
  name: string;
  description: string;
  template: boolean;
}
