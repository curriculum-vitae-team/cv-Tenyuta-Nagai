import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useProfileFormData } from '../../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { profileSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { InputSelect } from '../../../UI/InputSelect';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import {
  IProfileFormInput,
  IProfileModalUserId,
} from '../../EmployeesProfilePage/ProfileModal/ProfileModal.types';
import { FieldNameEmployeeSkillForm } from '../../../../constants/fieldNameEmployeeSkillForm';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';

export const SkillsModal = () => {
  const {
    id: userId,
  }: Pick<Partial<IProfileModalUserId>, keyof IProfileModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const { loading, userData, skillsData, skillMasteryData, positionsData } = useProfileFormData(
    userId!
  );

  const [updateUser, { loading: updateLoading }] = useMutation<IUserAllResult>(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IProfileFormInput>({
    mode: 'onChange',
  });

  const skillsNames = skillsData?.skills.map(({ id, name }) => ({
    id: name,
    name,
  }));

  console.log(createArrayForSkills(userData?.user.profile.skills));

  const onSubmit: SubmitHandler<IProfileFormInput> = (inputs) => {
    console.log(inputs);
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
            languages: userData?.user.profile.languages,
          },
          departmentId: userData?.user?.department?.id,
          positionId: userData?.user?.position?.id,
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
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputSelect
            label={'Skill'}
            registerName={FieldNameEmployeeSkillForm.SKILL_NAME}
            register={register}
            data={skillsNames!}
            defaultValue={''}
          />

          <InputSelect
            label={'Mastery'}
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
