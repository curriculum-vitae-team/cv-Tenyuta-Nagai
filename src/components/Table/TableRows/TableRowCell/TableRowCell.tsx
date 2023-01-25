import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../../../pages/EmployeesPage/TableData/TableData.interface';

const TableRowCell: FC<IColumnCellComponentProps> = ({ item, columnKey }) => {
  return <TableCell> {item[columnKey]}</TableCell>;
};

export { TableRowCell };
