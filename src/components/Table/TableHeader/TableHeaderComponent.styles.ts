import { styled, TableCell } from '@mui/material';

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  minWidth: '120px',
})) as typeof TableCell;
