import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../utils/routeVariables';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'primary.main', color: 'green' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ color: 'green' }}
      >
        <Tab
          component={NavLink}
          label={RoutePath.LOGIN}
          to={`/${RoutePath.LOGIN}`}
          sx={{
            minWidth: 150,
            color: 'primary.contrastText',
            fontWeight: 600,
          }}
        />
        <Tab
          component={NavLink}
          label={RoutePath.SIGNUP}
          to={`/${RoutePath.SIGNUP}`}
          sx={{
            minWidth: 150,
            color: 'primary.contrastText',
            fontWeight: 600,
          }}
        />
      </Tabs>
    </Box>
  );
};
