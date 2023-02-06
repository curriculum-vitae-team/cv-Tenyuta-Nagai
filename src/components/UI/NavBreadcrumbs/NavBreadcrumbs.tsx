import React, { useMemo } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import * as Styled from './NavBreadcrumbs.styles';
import { useIdPath } from './hook/useIdPath';
import { createBreadcrumbs } from './helpers/createBreadcrumbs';

export const NavBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = useMemo(
    () =>
      location.pathname.includes(RoutePath.ERROR)
        ? []
        : location.pathname.split('/').filter((x) => x),
    [location]
  );
  const { id } = useParams();
  const startPath = pathnames[0];
  const pathName = useIdPath(startPath, id);

  return (
    <Styled.WrapperBreadcrumbs role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {createBreadcrumbs(pathnames, id, pathName)}
      </Breadcrumbs>
    </Styled.WrapperBreadcrumbs>
  );
};
