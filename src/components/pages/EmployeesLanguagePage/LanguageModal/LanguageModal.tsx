import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { InputSelectEmployeePage } from '../../../UI/InputSelectEmployee';
import { notificationService } from '../../../../graphql/service/notification/notificationService';
import { createArrayForLanguages } from '../../../../utils/createArrayForLanguages';
import { useEmployeeLanguagesFormData } from '../helpers/useLanguagesFormData';
import { FieldNameEmployeeLanguagesForm } from '../constants/fieldNameEmployeeLanguagesForm';
import { ILanguagesFormInput, ILanguagesModalUserId } from './LanguageModal.interface';

export const LanguageModal = () => {
  const {
    id: userId,
  }: Pick<Partial<ILanguagesModalUserId>, keyof ILanguagesModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const {
    loading,
    userData,
    languagesData,
    languageProficiencyData,
  } = useEmployeeLanguagesFormData(userId!);

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ILanguagesFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILanguagesFormInput> = (inputs) => {
    if (
      createArrayForLanguages(userData?.user.profile.languages)
        .map(({ language_name }) => language_name)
        .includes(inputs.languageName)
    ) {
      notificationService.openErrorAlert('Language already exists');
      modalService.closeModal();
      return;
    }
    updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            languages: [
              { language_name: inputs.languageName, proficiency: inputs.proficiency },
              ...createArrayForLanguages(userData?.user.profile.languages),
            ],
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
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputSelectEmployeePage
            sx={{ minWidth: '150px' }}
            label={'Language'}
            registerName={FieldNameEmployeeLanguagesForm.LANGUAGE_NAME}
            register={register}
            data={languagesData!.languages}
            defaultValue={''}
          />

          <InputSelectEmployeePage
            sx={{ minWidth: '150px' }}
            label={'Proficiency'}
            registerName={FieldNameEmployeeLanguagesForm.PROFICIENCY}
            register={register}
            data={languageProficiencyData}
            defaultValue={''}
          />

          <ModalWindowButton loading={updateLoading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
