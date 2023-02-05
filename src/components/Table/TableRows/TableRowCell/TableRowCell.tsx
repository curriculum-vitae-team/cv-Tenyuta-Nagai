import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../template/templateTable.types';

const TableRowCell: FC<IColumnCellComponentProps> = ({ item, columnKey }) => {
  return <TableCell sx={{ minWidth: '138px' }}> {item[columnKey]}</TableCell>;
};

export { TableRowCell };
