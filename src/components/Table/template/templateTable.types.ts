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
  [key: string]: string | number;
} & Id;

export type Id = {
  id: string;
};
