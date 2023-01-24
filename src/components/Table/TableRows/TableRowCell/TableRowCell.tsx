import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../../../pages/EmployeesPage/TableData/TableData.interface';

const TableRowCell: FC<IColumnCellComponentProps> = (props) => {
  if (props.item && props.columnKey) {
    return <TableCell> {props.item[props.columnKey]}</TableCell>;
  }
  return null;
};

export { TableRowCell };
