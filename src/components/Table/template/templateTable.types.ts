export type TableHeader = {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
}[];

export type TableProps = {
  header: TableHeader;
};
