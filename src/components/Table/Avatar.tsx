import { TableCell, Avatar } from '@mui/material';
import React from 'react';

const AvatarImage = ({ source, value }: { source: string; value: string }) => {
  return (
    <TableCell>
      <Avatar src={source}>{value}</Avatar>
    </TableCell>
  );
};

export { AvatarImage };
