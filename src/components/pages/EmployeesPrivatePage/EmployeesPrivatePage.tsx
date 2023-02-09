import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { USER } from '../../../graphql/queries/user';
import { breadcrumbsService } from '../../../graphql/service/breadcrumbsService/breadcrumbsService';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { checkIdRoute } from '../../../utils/checkIdRoute';
import { NavButtonsPrivatePage } from '../../UI/NavButtonsPrivatePage';
import { tabsData } from './data/tabsData';
import * as Styled from './EmployeesPrivatePage.styles';

const EmployeesPrivatePage = () => {
  const { id } = useParams();
  const { data } = useQuery<IUserAllResult>(USER, {
    variables: { id },
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user) {
      breadcrumbsService.setIdPathName(data.user.profile.full_name || data.user.email);
    }
  }, [data]);

  useEffect(() => {
    if (checkIdRoute(location.pathname)) {
      navigate(`/${RoutePath.EMPLOYEES}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <main>
      <Styled.ContainerWrapper maxWidth="xl">
        <NavButtonsPrivatePage data={tabsData} startPath={RoutePath.EMPLOYEES} />
        <Outlet />
      </Styled.ContainerWrapper>
    </main>
  );
};

export default EmployeesPrivatePage;
