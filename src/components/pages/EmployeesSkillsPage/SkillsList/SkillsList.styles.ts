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

export const ItemChip = styled(Chip)<IChipStyled>(({ mastery }) => ({
  marginLeft: '20px',
  color: mastery == 'novice' ? 'orange' : 'green',
  borderColor: mastery == 'novice' ? 'orange' : 'green',
}));
