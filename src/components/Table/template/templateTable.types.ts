import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
