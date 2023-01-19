import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { TableRowProps } from './TableRowComponent.types';

const TableRowComponent = ({ children }: TableRowProps) => {
  return (
    <>
      <TableRow>
        <TableCell></TableCell>
        {children}
      </TableRow>
    </>
  );
};

export { TableRowComponent };
