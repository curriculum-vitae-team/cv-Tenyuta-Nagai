export interface IAdditionalButtonsProps {
  id: string;
}

export type TableRowProps = {
  children: React.ReactNode;
  AdditionalButtons: React.FC<IAdditionalButtonsProps>;
  id: string;
};
