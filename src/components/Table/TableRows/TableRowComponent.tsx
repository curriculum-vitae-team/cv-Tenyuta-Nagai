import { MoreVert } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { TableRowProps } from './TableRowComponent.types';

const TableRowComponent = ({ children }: TableRowProps) => {
  console.log(children);
  return (
    <>
      <TableRow>
        {children}
        <TableCell>
          <IconButton>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export { TableRowComponent };
