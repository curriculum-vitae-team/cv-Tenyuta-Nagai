import React, { FC } from 'react';
import * as Styled from './Row.styles';
import { IRowProps } from './Row.types';

export const Row: FC<IRowProps> = ({ title, content }) => {
  return (
    <Styled.TopicWrapper>
      <Styled.RowTitleTypography>{title}</Styled.RowTitleTypography>
      <Styled.RowContentTypography>{content}</Styled.RowContentTypography>
    </Styled.TopicWrapper>
  );
};
