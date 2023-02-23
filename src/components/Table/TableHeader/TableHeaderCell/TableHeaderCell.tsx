import React from 'react';
import { TableSortLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <TableCellStyled onClick={handleSorting} sortable={isSortable.toString()}>
      {t(name)}
      {isSortable && <TableSortLabel direction={direction} active={active} />}
    </TableCellStyled>
  );
};

export { TableHeaderCell };
