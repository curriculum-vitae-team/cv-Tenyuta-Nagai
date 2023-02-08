import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { IColumnCellComponentProps } from '../../../Table/template/templateTable.types';

export const TemplateCvsTable: FC<IColumnCellComponentProps> = ({ item }) => {
  return (
    <TableCell>
      {(item.template as boolean) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
    </TableCell>
  );
};
