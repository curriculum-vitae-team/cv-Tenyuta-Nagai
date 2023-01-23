import { TableRow } from '@mui/material';
import { TableHeaderComponentProps } from './TableHeaderComponent.types';

import { TableHeaderCell } from './TableHeaderCell';
import { TableCellStyled } from './TableHeaderComponent.styles';

const TableHeaderComponent = ({
  columns,
  sortingBy,
  handleSetSortingDirection,
  sortingIsAsc,
}: TableHeaderComponentProps) => {
  return (
    <TableRow>
      <TableCellStyled />
      {columns.map(({ columnName, columnKey, isSortable }) => {
        return (
          <TableHeaderCell
            name={columnName}
            key={columnName}
            active={sortingBy === columnKey}
            sortingIsAsc={sortingIsAsc}
            isSortable={isSortable}
            handleSetSortingDirection={handleSetSortingDirection}
            itemName={columnKey}
          />
        );
      })}
      <TableCellStyled />
    </TableRow>
  );
};

export { TableHeaderComponent };
