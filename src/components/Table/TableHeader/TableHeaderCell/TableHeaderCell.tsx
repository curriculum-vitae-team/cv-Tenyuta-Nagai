import React, { useState } from 'react';
import { TableSortLabel } from '@mui/material';
import { TableCellStyled } from '../TableHeaderComponent.styles';
import { TableHeaderCellProps } from './TableHeaderCell.types';

const TableHeaderCell = ({
  name,
  sortingIsAsc,
  active,
  isSortable,
  handleSetSortingDirection,
  itemName,
}: TableHeaderCellProps) => {
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const handleSorting = () => {
    handleSetSortingDirection(itemName);
    sortingIsAsc ? setDirection('asc') : setDirection('desc');
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
