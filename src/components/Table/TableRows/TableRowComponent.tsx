import { MoreVert } from '@mui/icons-material';
import { Avatar, IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { TableRowProps } from './TableRowComponent.types';

const TableRowComponent = ({ children }: TableRowProps) => {
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
