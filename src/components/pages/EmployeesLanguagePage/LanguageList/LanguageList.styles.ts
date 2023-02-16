import { IconButton, MenuItem, MenuList, Paper, styled } from '@mui/material';

export const ItemMenu = styled(MenuItem)(() => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  fontSize: 22,
  '&:hover': { backgroundColor: 'transparent' },
}));

export const ListMenu = styled(MenuList)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: 20,
  rowGap: 20,
  padding: 10,
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

export const ItemBox = styled(Paper)(({ theme }) => ({
  padding: '10px',
  minHeight: '100px',
  minWidth: '190px',
  backgroundColor: theme.palette.primary.contrastText,
}));

export const IconButtonListItem = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.secondary.contrastText,
}));
