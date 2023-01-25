import { TableRow } from '@mui/material';
import { TableHeaderComponentProps } from './TableHeaderComponent.types';

import { TableHeaderCell } from './TableHeaderCell';
import { TableCellStyled } from './TableHeaderComponent.styles';

const TableHeaderComponent = ({ columns }: TableHeaderComponentProps) => {
  return (
    <TableRow>
      {columns.map(({ columnName }) => {
        return <TableHeaderCell name={columnName} key={columnName} />;
      })}
      <TableCellStyled />
    </TableRow>
  );
};

export { TableHeaderComponent };
