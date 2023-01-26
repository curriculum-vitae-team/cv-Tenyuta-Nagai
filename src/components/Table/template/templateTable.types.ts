import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  handleDelete: (id: string) => void;
  searchParameter: string;
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
