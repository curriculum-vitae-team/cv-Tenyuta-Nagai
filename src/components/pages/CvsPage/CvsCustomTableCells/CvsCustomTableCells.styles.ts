import { styled, TableCell as MuiTableCell } from '@mui/material';

export const TableCell = styled(MuiTableCell)(() => ({
  maxWidth: 200,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
