export type TableHeader = {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
}[];

export type TableProps<T = Item> = {
  header: TableHeader;
  items: T[];
};

export type Item = {
  [key: string]: string;
  id: string;
};

export type Element = {
  id: string;
};
