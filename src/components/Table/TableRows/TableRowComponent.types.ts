import { Item } from '../template/templateTable.types';

export interface IAdditionalButtonsProps {
  item: Item;
  handleUpdate: () => void;
  setItem?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
}

export type TableRowProps = {
  children: React.ReactNode;
  AdditionalButtons?: React.FC<IAdditionalButtonsProps>;
  item: Item;
  handleUpdate?: () => void;
  setItem?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
};
