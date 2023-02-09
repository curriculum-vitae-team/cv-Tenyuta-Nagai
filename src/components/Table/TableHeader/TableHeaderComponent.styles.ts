import { styled, TableCell } from '@mui/material';
import { ITableCellStyled } from './TableHeaderComponent.types';

export const TableCellStyled = styled(TableCell)<ITableCellStyled>(({ theme, isSortable }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  minWidth: '155px',
  cursor: 'default',

  '&:hover': {
    color: isSortable && theme.palette.secondary.contrastText,
    cursor: isSortable && 'pointer',
  },
}));
