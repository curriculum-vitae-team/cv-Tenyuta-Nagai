import React, { FC } from 'react';
import * as Styled from './InputFile.styles';
import { IInputFileProps } from './InputFile.types';

export const InputFile: FC<IInputFileProps> = ({ children, register, registerName }) => {
  return (
    <Styled.FakeLabel component="label">
      {children}
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg, image/gif"
        {...register(registerName)}
      />
    </Styled.FakeLabel>
  );
};
