import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { checkIdRoute } from '../../../utils/checkIdRoute';
import { NavButtonsPrivatePage } from '../../UI/NavButtonsPrivatePage';
import { tabsData } from './data/tabsData';
import * as Styled from './EmployeesPrivatePage.styles';

const EmployeesPrivatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
