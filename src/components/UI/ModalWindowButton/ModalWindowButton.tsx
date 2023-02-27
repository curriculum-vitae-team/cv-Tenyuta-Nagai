import i18next from 'i18next';
import React from 'react';
import { IModalWindowButtonProps } from './ModalWindowButton.interface';
import * as Styled from './ModalWindowButton.styles';

export const ModalWindowButton = ({
  loading,
  isValid = true,
  size = 'large',
  name = i18next.t('Save')!,
  handleClick,
  ...props
}: IModalWindowButtonProps) => {
  return (
    <Styled.ButtonSubmit
      onClick={handleClick}
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
