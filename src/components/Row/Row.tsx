import React, { FC } from 'react';
import * as Styled from './Row.styles';
import { RowProps } from './Row.type';

export const Row: FC<RowProps> = ({ children, title }) => {
  return (
    <Styled.RowWrapper>
      <Styled.RowTitle>{title}</Styled.RowTitle>
      <Styled.RowContent>{children}</Styled.RowContent>
    </Styled.RowWrapper>
  );
};
