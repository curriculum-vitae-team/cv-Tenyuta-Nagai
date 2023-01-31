import { IUserAllResult } from '../../../../graphql/types/results/userTypeResult';

export interface ICvsMenuProps {
  data: IUserAllResult;
  open: boolean;
  showCvData: (id: string) => void;
  onClose: () => void;
}
