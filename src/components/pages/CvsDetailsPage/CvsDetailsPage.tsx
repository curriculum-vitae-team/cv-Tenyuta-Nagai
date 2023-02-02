import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { CV } from '../../../graphql/queries/cv';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import { useUser } from '../../../hooks/useUser';
import { Row } from '../../Row';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import * as Styled from './CvsDetailsPage.styles';

const CvsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const { loading, error, data } = useQuery<ICvQueryResult>(CV, {
    variables: { id },
  });
  console.log(data);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.CVS}`, { replace: true });
  }

  const handleEdit = () => {};

  return (
    <Styled.PaperWrapper elevation={3}>
      <Styled.Wrapper>
        <Styled.ContentWrapper>
          <Row title={'Name:'}>{data?.cv?.name || '-'}</Row>
          <Row title={'Description:'}>{data?.cv?.description || '-'}</Row>
          <Row title={'User name:'}>{data?.cv?.user?.profile?.full_name || '-'}</Row>
          <Row title={'User position:'}>{data?.cv?.user?.position_name || '-'}</Row>
          <Row title={'Skills:'}>
            {data?.cv?.languages?.length
              ? data?.cv?.skills.map(({ skill_name }) => (
                  <Typography key={skill_name}>{skill_name}</Typography>
                ))
              : '-'}
          </Row>
          <Row title={'Languages:'}>
            {data?.cv?.languages?.length
              ? data?.cv?.languages.map(({ language_name }) => (
                  <Typography key={language_name}>{language_name}</Typography>
                ))
              : '-'}
          </Row>
        </Styled.ContentWrapper>
        <Styled.BtnWrapper>
          <PrivateButton
            isVisible={user?.id === data?.cv.user?.id || isAdmin}
            onClick={handleEdit}
            sx={{ minWidth: 140 }}
          >
            Edit
          </PrivateButton>
        </Styled.BtnWrapper>
      </Styled.Wrapper>
    </Styled.PaperWrapper>
  );
};

export default CvsDetailsPage;
