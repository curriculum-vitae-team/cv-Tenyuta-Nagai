import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../utils/routeVariables';
import { TabAuthButtons, WrapAuthButtons } from './authButtons.styles';

const FIRST_BUTTON_INDEX = 0;
const SECOND_BUTTON_INDEX = 1;

export const AuthButtons = () => {
  const [value, setValue] = useState(FIRST_BUTTON_INDEX);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === `/${RoutePath.LOGIN}`) {
      setValue(FIRST_BUTTON_INDEX);
    } else if (path === `/${RoutePath.SIGNUP}`) {
      setValue(SECOND_BUTTON_INDEX);
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <WrapAuthButtons>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ color: 'green' }}
      >
        <TabAuthButtons component={NavLink} label={RoutePath.LOGIN} to={`/${RoutePath.LOGIN}`} />
        <TabAuthButtons component={NavLink} label={RoutePath.SIGNUP} to={`/${RoutePath.SIGNUP}`} />
      </Tabs>
    </WrapAuthButtons>
  );
};
