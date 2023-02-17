import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { PDFViewer, Document, pdf } from '@react-pdf/renderer';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { CV } from '../../../graphql/queries/cv';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import { CvPattern } from './CvPattern';

export const CvsPreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(CV, {
    variables: { id },
    onError: () => navigate(`/${RoutePath.CVS}`, { replace: true }),
  });
  console.log(data);
  return (
    <div>
      <CvPattern />
    </div>
  );
};
