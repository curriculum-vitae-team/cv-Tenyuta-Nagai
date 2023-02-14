import { useMutation, useQuery } from '@apollo/client';
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

  const { loading, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });

  const handleEdit = () => {
    modalService.setModalData('Add skill', SkillsModal, { id: id! });
  };

  const { userData } = useProfileFormData(id!);

  const [updateUser] = useMutation<IUserAllResult>(UPDATE_USER);

  const handleDelete = (skill: unknown) => {
    console.log(skill);
    console.log(createArrayForSkills(userData?.user.profile.skills));
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
            languages: userData?.user.profile.languages,
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || '',
          cvsIds: userData?.user?.cvs?.map(({ id }) => id) || [],
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
              <SkillsList data={data?.user?.profile.skills || []} handleDelete={handleDelete} />
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
