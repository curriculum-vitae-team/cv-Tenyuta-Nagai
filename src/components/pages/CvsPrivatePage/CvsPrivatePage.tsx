import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { CV } from '../../../graphql/queries/cv';
import { breadcrumbsService } from '../../../graphql/service/breadcrumbsService/breadcrumbsService';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import { checkIdCvsRoute } from '../../../utils/checkIdCvsRoute';
import { NavButtonsPrivatePage } from '../../UI/NavButtonsPrivatePage';
import * as Styled from './CvsPrivatePage.styles';
import { tabsData } from './data/tabsData';

const CvsPrivatePage = () => {
  const { id } = useParams();
  const { data } = useQuery<ICvQueryResult>(CV, {
    variables: { id },
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.cv?.name) {
      breadcrumbsService.setIdPathName(data?.cv.name);
    }
  }, [data]);

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
