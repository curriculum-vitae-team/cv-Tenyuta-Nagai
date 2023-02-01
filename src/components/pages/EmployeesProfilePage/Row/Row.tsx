import React, { FC } from 'react';
import * as Styled from '../EmployeesProfilePage.styles';
import { RowProps } from './Row.type';

export const Row: FC<RowProps> = ({ children, title }) => {
  return (
    <>
      <Styled.RowWrapper>
        <Styled.RowTitleTypography>{title}</Styled.RowTitleTypography>
        <Styled.RowContentTypography>{children}</Styled.RowContentTypography>
      </Styled.RowWrapper>
    </>
  );
};
