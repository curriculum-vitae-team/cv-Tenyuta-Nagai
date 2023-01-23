import React from 'react';
import { TableSortLabel } from '@mui/material';
import { TableCellStyled } from '../TableHeaderComponent.styles';
import { TableHeaderCellProps } from './TableHeaderCell.types';

const TableHeaderCell = ({
  name,
  active,
  direction,
  isSortable,
  handleSetSortingDirection,
  itemName,
}: TableHeaderCellProps) => {
  const handleSorting = () => {
    handleSetSortingDirection(itemName);
  };

  return (
    <TableCellStyled>
      {name}
      {isSortable && (
        <TableSortLabel direction={direction} active={active} onClick={handleSorting} />
      )}
    </TableCellStyled>
  );
};

export { TableHeaderCell };
