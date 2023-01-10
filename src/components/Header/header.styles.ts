import { styled, Toolbar } from '@mui/material';
import { IToolbarHeaderProps } from './header.types';

export const ToolbarHeader = styled(Toolbar)<IToolbarHeaderProps>(({ auth }) => ({
  display: 'flex',
  justifyContent: auth === 'true' ? 'space-between' : 'center',
  alignItems: auth === 'true' ? 'center' : 'end',
}));

export const WrapAuthBtnHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: 8,
}));
