import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { convertPathName } from '../../../utils/convertPathName';
import * as Styled from './NavBreadcrumbs.styles';

export const NavBreadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.includes(RoutePath.ERROR) ? [] : pathname.split('/').filter((x) => x);
  //TO-DO need to convert userId

  return (
    <Styled.WrapperBreadcrumbs role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={name}>{convertPathName(name)}</Typography>
          ) : (
            <Styled.Link component={NavLink} key={name} to={routeTo}>
              {convertPathName(name)}
            </Styled.Link>
          );
        })}
      </Breadcrumbs>
    </Styled.WrapperBreadcrumbs>
  );
};