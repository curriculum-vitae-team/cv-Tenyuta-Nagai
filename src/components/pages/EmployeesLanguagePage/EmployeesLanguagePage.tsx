import { useMutation } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { UPDATE_USER } from '../../../graphql/mutations/updateUser';
import { USER } from '../../../graphql/queries/user';
import { modalService } from '../../../graphql/service/modalService';
import { useUser } from '../../../hooks/useUser';
import { TError } from '../../../types/errorTypes';
import { createArrayForLanguages } from '../../../utils/createArrayForLanguages';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import * as Styled from './EmployeesLanguagePage.styles';
import { ILanguageProficiency } from './../../../interfaces/ILanguageProficiency.interface';
import { LanguagesList } from './LanguageList/LanguageList';
import { LanguageModal } from './LanguageModal/LanguageModal';
import { useEmployeeLanguagesFormData } from './helpers/useLanguagesFormData';

const EmployeesLanguagePage = () => {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;
  const { userData, loading } = useEmployeeLanguagesFormData(id!);

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER, variables: { id } }, 'User'],
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });

  const handleEdit = () => {
    modalService.setModalData('Add language', LanguageModal, { id: id! });
  };

  const handleDelete = (language: ILanguageProficiency) => {
    updateUser({
      variables: {
        id: id,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            languages: createArrayForLanguages(userData?.user.profile.languages).filter(
              (elem) => JSON.stringify(elem) != JSON.stringify(language)
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
              {userData!.user.profile.languages.length ? (
                <LanguagesList
                  data={userData!.user.profile.languages}
                  handleDelete={handleDelete}
                  isVisible={isVisible}
                />
              ) : (
                <Typography sx={{ fontSize: '20px' }}>No languages were found</Typography>
              )}
            </Styled.InfoWrapper>
          </Styled.Wrapper>

          <PrivateButton isVisible={isVisible} onClick={handleEdit} sx={{ minWidth: 140 }}>
            Add language
          </PrivateButton>
        </Styled.PaperWrapper>
      )}
    </>
  );
};

export default EmployeesLanguagePage;
