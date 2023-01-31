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
    if (isSortable) {
      handleSetSortingDirection(itemName);
    }
  };

  return (
    <TableCellStyled onClick={handleSorting}>
      {name}
      {isSortable && <TableSortLabel direction={direction} active={active} />}
    </TableCellStyled>
  );
};

export { TableHeaderCell };
