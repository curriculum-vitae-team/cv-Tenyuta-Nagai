import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  searchParameter: string;
};

export type Item = Record<string, string | boolean | number>;

export type Element = {
  id: string;
};
