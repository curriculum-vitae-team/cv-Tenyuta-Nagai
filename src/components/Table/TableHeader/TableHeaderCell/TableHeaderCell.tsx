import React from 'react';
import { TableCellStyled } from '../TableHeaderComponent.styles';
import { TableHeaderCellProps } from './TableHeaderCell.types';

const TableHeaderCell = ({ name }: TableHeaderCellProps) => {
  return (
    <>
      <TableCellStyled>{name}</TableCellStyled>
    </>
  );
};

export { TableHeaderCell };
