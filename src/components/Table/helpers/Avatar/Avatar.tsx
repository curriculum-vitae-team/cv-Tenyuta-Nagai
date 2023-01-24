import { TableCell, Avatar } from '@mui/material';
import React, { FC } from 'react';
import { IColumnCellComponentProps } from '../../../../pages/EmployeesPage/TableData/TableData.interface';

const AvatarImage: FC<IColumnCellComponentProps> = (props) => {
  return (
    <TableCell>
      <Avatar src={props.item?.avatar}>{props.item?.email[0].toUpperCase()}</Avatar>
    </TableCell>
  );
};

export { AvatarImage };
