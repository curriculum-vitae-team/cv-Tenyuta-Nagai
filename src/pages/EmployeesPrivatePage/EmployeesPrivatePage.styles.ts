import { styled, Container } from '@mui/material';

export const ContainerWrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12,
})) as typeof Container;
