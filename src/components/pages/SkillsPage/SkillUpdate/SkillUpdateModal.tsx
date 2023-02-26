import { useMutation, useReactiveVar } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { skillsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { FieldNameSkillsForm } from '../../../../constants/fieldNameSkillsForm';
import { SkillsInput } from '../../../../graphql/types/inputs/skill';
import { UPDATE_SKILL } from '../../../../graphql/mutations/skills';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';
import { ISkillUpdate } from './SkillUpdateModal.interface';

export const SkillsUpdateModal = () => {
  const skill: Pick<Partial<ISkillUpdate>, keyof ISkillUpdate> = useReactiveVar(
    modalService.modalData$
  );
  const [updateSkill, { loading }] = useMutation(UPDATE_SKILL);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<SkillsInput>({
    defaultValues: {
      name: skill.name,
    },
    mode: 'onChange',
    resolver: yupResolver(skillsSchema),
  });

  const onSubmit: SubmitHandler<SkillsInput> = (inputs) => {
    updateSkill({
      variables: {
        id: skill.id,
        skill: {
          name: inputs.name,
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
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name="Skill name"
            registerName={FieldNameSkillsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message || ''}
          />

          <ModalWindowButton
            loading={loading}
            isValid={checkDirtyFieldsForm(dirtyFields) && isValid}
          />
        </form>
      )}
    </>
  );
};
