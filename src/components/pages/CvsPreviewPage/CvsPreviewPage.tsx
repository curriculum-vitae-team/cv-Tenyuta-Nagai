import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { CV } from '../../../graphql/queries/cv';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { CvDownloadLink } from './CvDownload';
import { CvPattern } from './CvPattern';

export const CvsPreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const { data, loading } = useQuery(CV, {
    variables: { id },
    onError: () => navigate(`/${RoutePath.CVS}`, { replace: true }),
  });
  const isVisible = user?.id === data?.cv.user?.id || isAdmin;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CvDownloadLink data={data?.cv} isVisible={isVisible} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CvPattern data={data?.cv} />
          </Box>
        </>
      )}
    </>
  );
};
