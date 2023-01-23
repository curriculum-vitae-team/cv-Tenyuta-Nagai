import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
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
  const handleSorting = () => {
    handleSetSortingDirection(itemName);
  };

  return (
    <TableCellStyled>
      {name}
      {isSortable &&
        (sortingIsAsc ? (
          <IconButton onClick={handleSorting}>
            <ArrowDownwardIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSorting}>
            <ArrowUpwardIcon />
          </IconButton>
        ))}
    </TableCellStyled>
  );
};

export { TableHeaderCell };
