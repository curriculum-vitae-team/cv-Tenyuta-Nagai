import { Tabs } from '@mui/material';
import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { RoutePath } from '../../../../constants/routeVariables';
import { tabsData } from './data/tabsData';
import * as Styled from './NavButtons.styles';

export const NavButtons = () => {
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
        {tabsData.map(({ value }) => (
          <Styled.TabNav
            key={value}
            value={`/${RoutePath.EMPLOYEES}/${id}/${value}`}
            component={NavLink}
            label={value}
            to={value}
          />
        ))}
      </Tabs>
    </Styled.Wrapper>
  );
};
