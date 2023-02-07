import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { checkIdCvsRoute } from '../../../utils/checkIdCvsRoute';
import { NavButtonsPrivatePage } from '../../UI/NavButtonsPrivatePage';
import * as Styled from './CvsPrivatePage.styles';
import { tabsData } from './data/tabsData';

const CvsPrivatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkIdCvsRoute(location.pathname)) {
      navigate(`/${RoutePath.CVS}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <main>
      <Styled.ContainerWrapper maxWidth="xl">
        <NavButtonsPrivatePage data={tabsData} startPath={RoutePath.CVS} />
        <Outlet />
      </Styled.ContainerWrapper>
    </main>
  );
};

export default CvsPrivatePage;
