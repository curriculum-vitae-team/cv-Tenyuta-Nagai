import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { IInputTextProps } from './InputText.types';

export const InputText: FC<IInputTextProps> = ({ name, register, registerName, ...props }) => {
  return (
    <TextField
      {...props}
      inputProps={register(registerName)}
      name={name}
      fullWidth
      size="small"
      margin="normal"
      label={name}
    />
  );
};
