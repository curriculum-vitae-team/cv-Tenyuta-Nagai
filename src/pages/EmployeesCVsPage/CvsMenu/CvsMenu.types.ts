import { IUserAllResult } from '../../../interfaces/IUser.interface';

export interface ICvsMenuProps {
  data: IUserAllResult;
  open: boolean;
  showCvData: (id: string) => void;
  onClose: () => void;
}
