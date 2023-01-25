import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { IInputTextProps } from './InputText.type';

export const InputText: FC<IInputTextProps> = ({
  name,
  register,
  registerName,
  size = 'small',
  ...props
}) => {
  return (
    <TextField
      {...props}
      inputProps={register(registerName)}
      name={name}
      fullWidth
      size={size}
      margin="normal"
      label={name}
    />
  );
};
