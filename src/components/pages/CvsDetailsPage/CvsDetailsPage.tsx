import { useQuery } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { CV } from '../../../graphql/queries/cv';
import { modalService } from '../../../graphql/service/modalService';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import { useUser } from '../../../hooks/useUser';
import { Row } from '../../Row';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import { CvEditDetailsModal } from './CvEditDetailsModal/CvEditDetailsModal';
import * as Styled from './CvsDetailsPage.styles';
import { convertLanguagesArray, convertSkillsArray } from './helpers/convertArray';

const CvsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const { t } = useTranslation();
  const { loading, data } = useQuery<ICvQueryResult>(CV, {
    variables: { id },
    onError: () => navigate(`/${RoutePath.CVS}`, { replace: true }),
  });

  const handleEdit = () => {
    modalService.setModalData('Edit CV', CvEditDetailsModal, { ...data! });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Styled.PaperWrapper elevation={3}>
          <Styled.Wrapper>
            <Styled.ContentWrapper>
              <Row title={`${t('Name')}:`}>{data?.cv?.name || '-'}</Row>
              <Row title={`${t('Description')}:`}>{data?.cv?.description || '-'}</Row>
              <Row title={`${t('User')}:`}>
                {data?.cv?.user?.profile?.full_name || data?.cv?.user?.email || '-'}
              </Row>
              <Row title={`${t('User position')}:`}>{data?.cv?.user?.position_name || '-'}</Row>
              <Row title={`${t('Skills')}:`}>
                {data?.cv?.skills?.length ? convertSkillsArray(data?.cv?.skills) : '-'}
              </Row>
              <Row title={`${t('Languages')}:`}>
                {data?.cv?.languages?.length ? convertLanguagesArray(data?.cv?.languages) : '-'}
              </Row>
            </Styled.ContentWrapper>

            <Styled.BtnWrapper>
              <PrivateButton
                isVisible={user?.id === data?.cv.user?.id || isAdmin}
                onClick={handleEdit}
                sx={{ minWidth: 140 }}
              >
                {t('Edit')}
              </PrivateButton>
            </Styled.BtnWrapper>
          </Styled.Wrapper>
        </Styled.PaperWrapper>
      )}
    </>
  );
};

export default CvsDetailsPage;
