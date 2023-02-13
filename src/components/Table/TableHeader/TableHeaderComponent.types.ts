import { Directions } from '../../../constants/sortingDirections';
import { IAdditionalButtonsProps } from '../TableRows/TableRowComponent.types';
import { IColumn } from '../template/templateTable.types';

export type TableHeaderComponentProps = {
  columns: IColumn[];
  sortingBy: string;
  handleSetSortingDirection: (columnName: string) => void;
  direction: Directions;
  AdditionalButtons?: React.FC<IAdditionalButtonsProps>;
};

export interface ITableCellStyled {
  sortable?: string;
}
