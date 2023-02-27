import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { FieldNameEmployeeSkillForm } from '../constants/fieldNameEmployeeSkillForm';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';
import { InputSelectEmployeePage } from '../../../UI/InputSelectEmployee';
import { employeeSkillsSchema } from '../../../../utils/validationSchema';
import { useEmployeeSkillsFormData } from '../helpers/useEmployeeSkillsFormData';
import { ISkillsFormInput, ISkillsModalUserId } from './SkillsModal.types';

export const SkillsModal = () => {
  const {
    id: userId,
  }: Pick<Partial<ISkillsModalUserId>, keyof ISkillsModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const { loading, userData, skillsData, skillMasteryData } = useEmployeeSkillsFormData(userId!);
  const skillsList = userData?.user.profile.skills.map(({ skill_name }) => skill_name);

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISkillsFormInput>({
    mode: 'onChange',
    resolver: yupResolver(employeeSkillsSchema),
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ISkillsFormInput> = (inputs) => {
    updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            skills: [
              { skill_name: inputs.skillName, mastery: inputs.mastery },
              ...createArrayForSkills(userData?.user.profile.skills),
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
            label={t('Skill')}
            registerName={FieldNameEmployeeSkillForm.SKILL_NAME}
            register={register}
            data={skillsData!.skills.filter((element) => !skillsList?.includes(element.name))}
            defaultValue={''}
          />

          <InputSelectEmployeePage
            sx={{ minWidth: '150px' }}
            label={t('Mastery')}
            registerName={FieldNameEmployeeSkillForm.MASTERY}
            register={register}
            data={skillMasteryData}
            defaultValue={''}
          />

          <ModalWindowButton loading={updateLoading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
