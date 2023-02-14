import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { USER } from '../../../graphql/queries/user';
import { modalService } from '../../../graphql/service/modalService';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import * as Styled from './EmployeesSkillsPage.styles';
import { SkillsList } from './SkillsList/SkillsList';
import { SkillsModal } from './SkillsModal/SkillsModal';

const EmployeesSkillsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = user?.role === UserRoles.Admin;
  const currentId = isAdmin ? id : user?.id;
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;

  const { loading, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });

  const handleEdit = () => {
    modalService.setModalData('Add', SkillsModal, { id: id! });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Styled.PaperWrapper elevation={3}>
          <Styled.Wrapper>
            <Styled.InfoWrapper>
              <SkillsList data={data?.user?.profile.skills || []} />
            </Styled.InfoWrapper>
          </Styled.Wrapper>

          <PrivateButton isVisible={isVisible} onClick={handleEdit} sx={{ minWidth: 140 }}>
            Add skill
          </PrivateButton>
        </Styled.PaperWrapper>
      )}
    </>
  );
};

export default EmployeesSkillsPage;
