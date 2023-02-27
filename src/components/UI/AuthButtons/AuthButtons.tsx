import React from 'react';
import Tabs from '@mui/material/Tabs';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../constants/routeVariables';
import { TabAuthButtons, WrapAuthButtons } from './authButtons.styles';

export const AuthButtons = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
          label={t(RoutePath.LOGIN)}
          to={`/${RoutePath.LOGIN}`}
        />
        <TabAuthButtons
          value={`/${RoutePath.SIGNUP}`}
          component={NavLink}
          label={t(RoutePath.SIGNUP)}
          to={`/${RoutePath.SIGNUP}`}
        />
      </Tabs>
    </WrapAuthButtons>
  );
};
