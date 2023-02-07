import { styled, TableCell } from '@mui/material';

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  minWidth: '155px',
  cursor: 'default',
  '&:hover': {
    color: theme.palette.secondary.contrastText,
  },
})) as typeof TableCell;
