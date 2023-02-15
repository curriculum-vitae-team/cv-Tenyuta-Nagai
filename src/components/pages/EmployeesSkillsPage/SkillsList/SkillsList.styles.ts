import { Chip, MenuItem, MenuList, styled } from '@mui/material';
import { IChipStyled } from './SkillsList.interface';

export const ItemMenu = styled(MenuItem)(() => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  fontSize: 18,
  '&:hover': { backgroundColor: 'transparent' },
}));

export const ListMenu = styled(MenuList)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
}));

export const ItemChip = styled(Chip)<IChipStyled>(({ mastery, theme }) => ({
  marginLeft: '20px',
  backgroundColor: mastery,
  color: theme.palette.primary.contrastText,
}));
