import { IUserAllResult } from '../../../../graphql/types/results/user';

export interface ICvsMenuProps {
  data: IUserAllResult;
  open: boolean;
  showCvData: (id: string) => void;
  onClose: () => void;
}
