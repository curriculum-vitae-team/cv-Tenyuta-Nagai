import React from 'react';
import Tabs from '@mui/material/Tabs';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { TabAuthButtons, WrapAuthButtons } from './authButtons.styles';

export const AuthButtons = () => {
  const location = useLocation();

  return (
    <WrapAuthButtons>
      <Tabs
        value={location.pathname}
        centered
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ color: 'green' }}
      >
        <TabAuthButtons
          value={`/${RoutePath.LOGIN}`}
          component={NavLink}
          label={RoutePath.LOGIN}
          to={`/${RoutePath.LOGIN}`}
        />
        <TabAuthButtons
          value={`/${RoutePath.SIGNUP}`}
          component={NavLink}
          label={RoutePath.SIGNUP}
          to={`/${RoutePath.SIGNUP}`}
        />
      </Tabs>
    </WrapAuthButtons>
  );
};
