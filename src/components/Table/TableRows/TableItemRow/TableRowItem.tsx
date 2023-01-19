import { TableCell } from '@mui/material';
import React from 'react';
import { TableRowItemProps } from './TableRowItem.types';

const TableRowItem = ({ value }: TableRowItemProps) => {
  return <TableCell>{value}</TableCell>;
};

export { TableRowItem };
