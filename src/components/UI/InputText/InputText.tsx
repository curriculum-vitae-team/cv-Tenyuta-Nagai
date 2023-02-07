import React from 'react';
import { TextField } from '@mui/material';
import { IInputTextProps } from './InputText.type';

export const InputText = <T extends Record<string, unknown>>({
  name,
  register,
  registerName,
  size = 'small',
  type,
  ...props
}: IInputTextProps<T>) => {
  return (
    <TextField
      {...props}
      inputProps={register && registerName && register(registerName)}
      name={name}
      fullWidth
      size={size}
      margin="normal"
      label={name}
      type={type}
    />
  );
};
