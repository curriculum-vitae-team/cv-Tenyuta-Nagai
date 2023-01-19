import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { EmployeesNavButtons } from '../../components/UI/EmployeesNavButtons';
import { RoutePath } from '../../constants/routeVariables';
import { checkIdRoute } from '../../utils/checkIdRoute';

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
      <Container maxWidth="xl">
        <EmployeesNavButtons />
        <Outlet />
      </Container>
    </main>
  );
};

export default EmployeesPrivatePage;
