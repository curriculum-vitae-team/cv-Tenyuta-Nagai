import { Button, MenuItem, MenuList, Paper as MuiPaper, styled } from '@mui/material';

export const Paper = styled(MuiPaper)(() => ({
  minWidth: '100%',
  minHeight: 300,
}));

export const WrapperCvsButton = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 18,
  paddingBottom: 18,
}));

export const CvsButton = styled(Button)(() => ({
  fontSize: 18,
  fontWeight: 500,
}));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 16,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: 16,
  },
}));

export const ContentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  columnGap: 18,

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

export const ItemMenu = styled(MenuItem)(() => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));

export const ListMenu = styled(MenuList)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
}));
