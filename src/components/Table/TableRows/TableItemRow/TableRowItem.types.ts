export interface IEntryData {
  id: string;
  [key: string]: EntryValue;
}

export type EntryValue = string | number | Date | Array<unknown>;

export type TableEntryValue = string | number;

export type TableRowItemProps = {
  value?: TableEntryValue;
};
