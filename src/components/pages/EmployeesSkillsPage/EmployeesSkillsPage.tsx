import { useMutation } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { UPDATE_USER } from '../../../graphql/mutations/updateUser';
import { USER } from '../../../graphql/queries/user';
import { modalService } from '../../../graphql/service/modalService';
import { useUser } from '../../../hooks/useUser';
import { ISkillMastery } from '../../../interfaces/ISkillMastery.interface';
import { TError } from '../../../types/errorTypes';
import { createArrayForSkills } from '../../../utils/createArrayForSkills';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import { useEmployeeSkillsFormData } from './helpers/useEmployeeSkillsFormData';
import * as Styled from './EmployeesSkillsPage.styles';
import { SkillsList } from './SkillsList/SkillsList';
import { SkillsModal } from './SkillsModal/SkillsModal';

const EmployeesSkillsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;
  const { userData, loading } = useEmployeeSkillsFormData(id!);
  const { t } = useTranslation();

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER, variables: { id } }, 'User'],
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });

  const handleEdit = () => {
    modalService.setModalData(t('Add skill'), SkillsModal, { id: id! });
  };

  const handleDelete = (skill: ISkillMastery) => {
    updateUser({
      variables: {
        id: id,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            skills: createArrayForSkills(userData?.user.profile.skills).filter(
              (elem) => JSON.stringify(elem) !== JSON.stringify(skill)
            ),
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || '',
        },
      },
    })
      .catch((err: TError) => console.error(err.message))
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
              {userData!.user.profile.skills.length ? (
                <SkillsList
                  data={userData!.user.profile.skills}
                  handleDelete={handleDelete}
                  isVisible={isVisible}
                />
              ) : (
                <Typography sx={{ fontSize: '20px' }}>{t('No skills were found')}</Typography>
              )}
            </Styled.InfoWrapper>
          </Styled.Wrapper>

          <PrivateButton isVisible={isVisible} onClick={handleEdit} sx={{ minWidth: 140 }}>
            {t('Add skill')}
          </PrivateButton>
        </Styled.PaperWrapper>
      )}
    </>
  );
};

export default EmployeesSkillsPage;
