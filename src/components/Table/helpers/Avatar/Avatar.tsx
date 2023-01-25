import { TableCell, Avatar } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../../../pages/EmployeesPage/TableData/TableData.interface';

const AvatarImage: FC<IColumnCellComponentProps> = ({ item }) => {
  return (
    <TableCell>
      <Avatar src={item?.avatar}>
        {item.name ? item.name[0].toUpperCase() : item?.email[0].toUpperCase()}
      </Avatar>
    </TableCell>
  );
};

export { AvatarImage };
