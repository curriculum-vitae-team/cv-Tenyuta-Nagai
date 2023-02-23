import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { GET_PROJECT } from '../../../graphql/queries/project';
import { breadcrumbsService } from '../../../graphql/service/breadcrumbsService/breadcrumbsService';
import { modalService } from '../../../graphql/service/modalService';
import { IProjectResult } from '../../../graphql/types/results/projects';
import { useUser } from '../../../hooks/useUser';
import { Row } from '../../Row';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import * as Styled from './ProjectsDetailsPage.styles';
import { ProjectUpdateModal } from './ProjectUpdateModal';

const ProjectsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data } = useQuery<IProjectResult>(GET_PROJECT, {
    variables: { id },
    onError: () => navigate(`/${RoutePath.PROJECTS}`, { replace: true }),
  });
  const user = useUser();
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;
  const { t } = useTranslation();

  useEffect(() => {
    if (data?.project) {
      breadcrumbsService.setIdPathName(data.project.name);
    }
  }, [data]);

  const handleEdit = () => {
    modalService.setModalData(t('Update project'), ProjectUpdateModal, { ...data });
  };

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <Styled.ContainerWrapper maxWidth="xl">
          <Styled.PaperWrapper elevation={3}>
            <Styled.Wrapper>
              <Styled.RowWrapper>
                <Styled.RowContentTypography>
                  {data?.project.name || '-'}
                </Styled.RowContentTypography>
              </Styled.RowWrapper>

              <Styled.InfoWrapper>
                <Row title={t('Internal name:')}>{data?.project?.internal_name || '-'}</Row>
                <Row title={t('Description') + ':'}>{data?.project?.description || '-'}</Row>
                <Row title={t('Domain') + ':'}>{data?.project?.domain || '-'}</Row>
                <Row title={t('Start date:')}>{data?.project?.start_date}</Row>
                <Row title={t('End date:')}>{data?.project?.end_date || t('Till now')}</Row>
              </Styled.InfoWrapper>
            </Styled.Wrapper>

            <PrivateButton isVisible={isVisible} onClick={handleEdit} sx={{ minWidth: 140 }}>
              {t('Edit')}
            </PrivateButton>
          </Styled.PaperWrapper>
        </Styled.ContainerWrapper>
      )}
    </main>
  );
};

export default ProjectsDetailsPage;
