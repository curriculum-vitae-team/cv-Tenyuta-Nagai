import { IUserAllResult } from '../../../interfaces/IUser.interface';

export interface ICvModalProps {
  open: boolean;
  onClose: () => void;
  userData: IUserAllResult;
}

export interface IFormCreateCv {
  name: string;
  description: string;
}
