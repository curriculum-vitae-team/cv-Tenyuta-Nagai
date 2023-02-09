import { styled, TableCell } from '@mui/material';
import { ITableCellStyled } from './TableHeaderComponent.types';

export const TableCellStyled = styled(TableCell)<ITableCellStyled>(({ theme, sortable }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  minWidth: '155px',
  cursor: 'default',

  '&:hover': {
    color: sortable === 'true' && theme.palette.secondary.contrastText,
    cursor: sortable === 'true' && 'pointer',
  },
}));
