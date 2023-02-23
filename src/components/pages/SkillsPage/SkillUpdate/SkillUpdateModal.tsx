import { useMutation, useReactiveVar } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { skillsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { FieldNameSkillsForm } from '../../../../constants/fieldNameSkillsForm';
import { SkillsInput } from '../../../../graphql/types/inputs/skill';
import { UPDATE_SKILL } from '../../../../graphql/mutations/skills';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { ISkillUpdate } from './SkillUpdateModal.interface';

export const SkillsUpdateModal = () => {
  const skill: Pick<Partial<ISkillUpdate>, keyof ISkillUpdate> = useReactiveVar(
    modalService.modalData$
  );
  const { t } = useTranslation();
  const [updateSkill, { loading }] = useMutation(UPDATE_SKILL);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
            name={t('Skill name')}
            registerName={FieldNameSkillsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={t(errors.name?.message as string) || ''}
          />

          <ModalWindowButton loading={loading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
