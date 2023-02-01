import React, { FC } from 'react';
import { ICvsListProps } from './CvsList.types';
import * as Styled from './CvsList.styles';

export const CvsList: FC<ICvsListProps> = ({ data, onClick }) => {
  return (
    <Styled.ListMenu>
      {data.map(({ id, name }) => (
        <Styled.ItemMenu key={id} onClick={onClick(id)}>
          {name}
        </Styled.ItemMenu>
      ))}
    </Styled.ListMenu>
  );
};
