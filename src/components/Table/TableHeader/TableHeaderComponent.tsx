import { TableRow } from '@mui/material';
import { TableHeaderComponentProps } from './TableHeaderComponent.types';
import { TableHeaderCell } from './TableHeaderCell';
import { TableCellStyled } from './TableHeaderComponent.styles';

const TableHeaderComponent = ({
  columns,
  sortingBy,
  direction,
  AdditionalButtons,
  handleSetSortingDirection,
}: TableHeaderComponentProps) => {
  return (
    <TableRow>
      {columns.map(({ columnName, columnKey, isSortable }) => {
        return (
          <TableHeaderCell
            direction={direction}
            name={columnName}
            key={columnName}
            active={sortingBy === columnKey}
            isSortable={isSortable}
            handleSetSortingDirection={handleSetSortingDirection}
            itemName={columnKey}
          />
        );
      })}
      {AdditionalButtons && <TableCellStyled sx={{ minWidth: '50px' }} />}
    </TableRow>
  );
};

export { TableHeaderComponent };
