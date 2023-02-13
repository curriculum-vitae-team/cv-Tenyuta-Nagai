import { TableCell, Avatar } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../template/templateTable.types';

const AvatarImage: FC<IColumnCellComponentProps> = ({ item }) => {
  return (
    <TableCell>
      <Avatar src={item?.avatar as string | undefined}>
        {item.name
          ? (item.name as string)[0].toUpperCase()
          : (item?.email as string)[0].toUpperCase()}
      </Avatar>
    </TableCell>
  );
};

export { AvatarImage };
