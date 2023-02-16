import { MenuItem, MenuList, Paper, styled } from '@mui/material';

export const ItemMenu = styled(MenuItem)(() => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  fontSize: 22,
  '&:hover': { backgroundColor: 'transparent' },
}));

export const ListMenu = styled(MenuList)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
}));

export const ItemBox = styled(Paper)(() => ({
  minHeight: '100px',
  minWidth: '150px',
}));
