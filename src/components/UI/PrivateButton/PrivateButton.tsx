import React, { FC } from 'react';
import { IPrivateButtonProps } from './PrivateButton.types';
import * as Styled from './PrivateButton.styles';

export const PrivateButton: FC<IPrivateButtonProps> = ({ children, isVisible, ...props }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Styled.ContainedButton {...props} variant="contained">
      {children}
    </Styled.ContainedButton>
  );
};
