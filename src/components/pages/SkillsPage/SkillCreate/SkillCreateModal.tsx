import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import * as Styled from './SkillCreateModal.styles';

export const SkillCreateModal = () => {
  const [createSkill, { loading }] = useMutation(CREATE_SKILL);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SkillsInput>({
    mode: 'onChange',
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
            name="Skill name"
            registerName={FieldNameSkillsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message || ''}
          />

          <Styled.ButtonSubmit
            loading={loading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid}
          >
            {'Save'}
          </Styled.ButtonSubmit>
        </form>
      )}
    </>
  );
};
