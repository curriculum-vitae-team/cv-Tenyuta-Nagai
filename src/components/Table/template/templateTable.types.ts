export type TableHeader = {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
}[];

export type TableProps<T = Item> = {
  header: TableHeader;
  items: T[];
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
