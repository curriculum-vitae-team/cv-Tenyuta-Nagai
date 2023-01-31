import { IUserAllResult } from '../../../../graphql/types/results/user';
import { ICvData } from '../EmployeesCVsPage.types';

export interface ICvEditModalProps {
  open: boolean;
  onClose: (data?: ICvData) => void;
  userData: IUserAllResult;
  cvId: string;
}

export interface IFormEditCv {
  name: string;
  description: string;
  template: boolean;
}
