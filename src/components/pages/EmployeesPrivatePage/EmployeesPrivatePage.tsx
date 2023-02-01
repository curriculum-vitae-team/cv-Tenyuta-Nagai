import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { checkIdRoute } from '../../../utils/checkIdRoute';
import * as Styled from './EmployeesPrivatePage.styles';
import { NavButtons } from './NavButtons/NavButtons';

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
        <NavButtons />
        <Outlet />
      </Styled.ContainerWrapper>
    </main>
  );
};

export default EmployeesPrivatePage;
