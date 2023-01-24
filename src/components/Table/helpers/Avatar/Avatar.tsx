import { TableCell, Avatar } from '@mui/material';
import React from 'react';
import { IAvatarImageProps } from './Avatar.interface';

const AvatarImage = ({ source, value }: IAvatarImageProps) => {
  return (
    <TableCell>
      <Avatar src={source}>{value}</Avatar>
    </TableCell>
  );
};

export { AvatarImage };
