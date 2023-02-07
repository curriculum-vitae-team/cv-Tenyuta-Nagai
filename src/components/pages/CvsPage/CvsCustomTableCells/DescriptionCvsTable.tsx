import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../../Table/template/templateTable.types';
import { TableCell as StyledTableCell } from './CvsCustomTableCells.styles';

export const DescriptionCvsTable: FC<IColumnCellComponentProps> = ({ item }) => {
  return <StyledTableCell>{item.description}</StyledTableCell>;
};
