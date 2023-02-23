import { Chip, MenuItem, MenuList, styled, Box } from '@mui/material';
import { IChipStyled } from './SkillsList.interface';

export const ItemMenu = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  columnGap: 30,
  fontSize: 22,
  '&:hover': { backgroundColor: 'transparent' },

  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
    columnGap: 10,
  },
}));

export const ItemBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  columnGap: 10,
}));

export const ListMenu = styled(MenuList)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
}));

export const ItemChip = styled(Chip)<IChipStyled>(({ mastery, theme }) => ({
  backgroundColor: mastery,
  color: theme.palette.primary.contrastText,
}));
