import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../../pages/EmployeesPage/TableData/TableData.interface';

const TableRowCell: FC<IColumnCellComponentProps> = ({ item, columnKey }) => {
  return <TableCell sx={{ minWidth: '155px' }}> {item[columnKey]}</TableCell>;
};

export { TableRowCell };
