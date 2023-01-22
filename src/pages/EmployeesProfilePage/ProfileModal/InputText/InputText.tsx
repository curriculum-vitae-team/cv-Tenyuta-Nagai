import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { IInputTextProps } from './InputText.types';

export const InputText: FC<IInputTextProps> = ({ name, register, registerName }) => {
  return (
    <TextField
      inputProps={register(registerName)}
      autoComplete=""
      name={name}
      fullWidth
      size="small"
      margin="normal"
      label={name}
    />
  );
};
