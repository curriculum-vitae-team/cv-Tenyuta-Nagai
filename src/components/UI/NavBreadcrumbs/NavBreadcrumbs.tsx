import React, { useMemo } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation, useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { RoutePath } from '../../../constants/routeVariables';
import { breadcrumbsService } from '../../../graphql/service/breadcrumbsService/breadcrumbsService';
import * as Styled from './NavBreadcrumbs.styles';
import { CreateBreadcrumbs } from './helpers/createBreadcrumbs';

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
  const idPathName = useReactiveVar(breadcrumbsService.idPathName$);

  return (
    <Styled.WrapperBreadcrumbs role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {CreateBreadcrumbs(pathnames, id, idPathName)}
      </Breadcrumbs>
    </Styled.WrapperBreadcrumbs>
  );
};
