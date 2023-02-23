import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldNameSkillsForm } from '../../../../constants/fieldNameSkillsForm';
import { updateCacheAfterCreatingSkill } from '../../../../graphql/cache/skills';
import { CREATE_SKILL } from '../../../../graphql/mutations/skills';
import { modalService } from '../../../../graphql/service/modalService';
import { SkillsInput } from '../../../../graphql/types/inputs/skill';
import { CreateSkillsResult } from '../../../../graphql/types/results/skills';
import { TError } from '../../../../types/errorTypes';
import { skillsSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';

export const SkillCreateModal = () => {
  const [createSkill, { loading }] = useMutation(CREATE_SKILL);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<SkillsInput>({
    resolver: yupResolver(skillsSchema),
  });

  const onSubmit: SubmitHandler<SkillsInput> = (inputs) => {
    createSkill({
      variables: {
        skill: {
          name: inputs.name,
        },
      },
      update(cache, { data }) {
        updateCacheAfterCreatingSkill(cache, (data as unknown) as CreateSkillsResult);
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

          <ModalWindowButton loading={loading} isValid={!isSubmitted || isValid} />
        </form>
      )}
    </>
  );
};
