import { Tabs } from '@mui/material';
import React, { FC } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { INavButtonsPrivatePageProps } from './NavButtonsPrivatePage.types';
import * as Styled from './NavButtonsPrivatePage.styles';

export const NavButtonsPrivatePage: FC<INavButtonsPrivatePageProps> = ({ data, startPath }) => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <Styled.Wrapper>
      <Tabs
        value={location.pathname}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {data.map(({ value }) => (
          <Styled.TabNav
            key={value}
            value={`/${startPath}/${id}/${value}`}
            component={NavLink}
            label={value}
            to={value}
          />
        ))}
      </Tabs>
    </Styled.Wrapper>
  );
};
