import React from 'react';
import { IModalWindowButtonProps } from './ModalWindowButton.interface';
import * as Styled from './ModalWindowButton.styles';

export const ModalWindowButton = ({
  loading,
  isValid,
  size = 'large',
  name = 'Save',
  ...props
}: IModalWindowButtonProps) => {
  return (
    <Styled.ButtonSubmit
      loading={loading}
      type="submit"
      variant="contained"
      fullWidth
      size={size}
      disabled={!isValid}
      {...props}
    >
      {name}
    </Styled.ButtonSubmit>
  );
};
