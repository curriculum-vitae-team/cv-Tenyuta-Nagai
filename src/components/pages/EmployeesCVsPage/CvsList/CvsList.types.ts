import { ICv } from '../../../../interfaces/ICv.interface';

export interface ICvsListProps {
  data: ICv[];
  onClick: (id: string) => () => void;
}
