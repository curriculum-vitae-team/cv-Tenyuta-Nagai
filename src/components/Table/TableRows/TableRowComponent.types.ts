import { Item } from '../template/templateTable.types';

export interface IAdditionalButtonsProps {
  item: Item;
}

export type TableRowProps = {
  children: React.ReactNode;
  AdditionalButtons?: React.FC<IAdditionalButtonsProps>;
  item: Item;
};
