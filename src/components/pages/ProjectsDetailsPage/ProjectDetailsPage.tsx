import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { GET_PROJECT } from '../../../graphql/queries/project';
import { IProjectResult } from '../../../graphql/types/results/projects';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import { ProfileModal } from '../EmployeesProfilePage/ProfileModal/ProfileModal';
import * as Styled from './ProjectsDetailsPage.styles';
import { Row } from './Row/Row';

const ProjectsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const { loading, error, data } = useQuery<IProjectResult>(GET_PROJECT, {
    variables: { id },
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.PROJECTS}`, { replace: true });
  }

  const handleEdit = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Styled.PaperWrapper elevation={3}>
        <Styled.Wrapper>
          <Styled.RowWrapper>
            <Styled.RowContentTypography>{data?.project.name || '-'}</Styled.RowContentTypography>
          </Styled.RowWrapper>

          <Styled.InfoWrapper>
            <Row title={'Internal name:'}>{data?.project?.name || '-'}</Row>
            <Row title={'Description:'}>{data?.project?.internal_name || '-'}</Row>
            <Row title={'Domain:'}>{data?.project?.description || '-'}</Row>
            <Row title={'Start date:'}>{data?.project?.domain || '-'}</Row>
            <Row title={'End date:'}>{data?.project?.start_date}</Row>
          </Styled.InfoWrapper>
        </Styled.Wrapper>

        <PrivateButton isVisible={isVisible} onClick={handleEdit} sx={{ minWidth: 140 }}>
          Edit
        </PrivateButton>
      </Styled.PaperWrapper>

      {isOpenModal && <ProfileModal userId={id!} open={isOpenModal} onClose={handleCloseModal} />}
    </>
  );
};

export default ProjectsDetailsPage;
