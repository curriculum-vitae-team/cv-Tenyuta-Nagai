import { Tabs } from '@mui/material';
import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import * as Styled from './EmployeesNavButtons.styles';

export const EmployeesNavButtons = () => {
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
        <Styled.TabNav
          value={`/${RoutePath.EMPLOYEES}/${id}/${RoutePath.PROFILE}`}
          component={NavLink}
          label={RoutePath.PROFILE}
          to={RoutePath.PROFILE}
        />
        <Styled.TabNav
          value={`/${RoutePath.EMPLOYEES}/${id}/${RoutePath.SKILLS}`}
          component={NavLink}
          label={RoutePath.SKILLS}
          to={RoutePath.SKILLS}
        />
        <Styled.TabNav
          value={`/${RoutePath.EMPLOYEES}/${id}/${RoutePath.LANGUAGES}`}
          component={NavLink}
          label={RoutePath.LANGUAGES}
          to={RoutePath.LANGUAGES}
        />
        <Styled.TabNav
          value={`/${RoutePath.EMPLOYEES}/${id}/${RoutePath.CVS}`}
          component={NavLink}
          label={RoutePath.CVS}
          to={RoutePath.CVS}
        />
      </Tabs>
    </Styled.Wrapper>
  );
};
