import { Item } from '../../../components/Table/template/templateTable.types';

export interface IColumn {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
  ColumnCellComponent?: React.FC<IColumnCellComponentProps>;
}

export interface IColumnCellComponentProps {
  item: Item;
  columnKey: string;
  handleDelete?: (id: string) => void;
  id?: string;
}
