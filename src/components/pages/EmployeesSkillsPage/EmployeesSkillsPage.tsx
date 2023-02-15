import { useMutation, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { UPDATE_USER } from '../../../graphql/mutations/updateUser';
import { USER } from '../../../graphql/queries/user';
import { modalService } from '../../../graphql/service/modalService';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { useProfileFormData } from '../../../hooks/useProfileFormData';
import { useUser } from '../../../hooks/useUser';
import { TError } from '../../../types/errorTypes';
import { createArrayForSkills } from '../../../utils/createArrayForSkills';
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
  const { userData } = useProfileFormData(id!);

  const { loading, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });
  const [updateUser] = useMutation(UPDATE_USER);

  const handleEdit = () => {
    modalService.setModalData('Add skill', SkillsModal, { id: id! });
  };

  const handleDelete = (skill: unknown) => {
    updateUser({
      variables: {
        id: id,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            skills: createArrayForSkills(userData?.user.profile.skills).filter(
              (elem) => JSON.stringify(elem) != JSON.stringify(skill)
            ),
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || '',
        },
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => modalService.closeModal());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Styled.PaperWrapper elevation={3}>
          <Styled.Wrapper>
            <Styled.InfoWrapper>
              {data!.user.profile.skills.length > 0 ? (
                <SkillsList data={data?.user?.profile.skills || []} handleDelete={handleDelete} />
              ) : (
                <Typography sx={{ fontSize: '20px' }}>No skills were found</Typography>
              )}
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
