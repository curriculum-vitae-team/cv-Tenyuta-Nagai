import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FieldNameSkillsForm } from '../../../../constants/fieldNameSkillsForm';
import { updateCacheAfterCreatingSkill } from '../../../../graphql/cache/skills';
import { CREATE_SKILL } from '../../../../graphql/mutations/skills';
import { SkillsInput } from '../../../../graphql/types/inputs/skill';
import { CreateSkillsResult } from '../../../../graphql/types/results/skills';
import { TError } from '../../../../types/errorTypes';
import { TFormSubmit } from '../../../../types/formTypes';
import { skillsSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { IModalForCreatingProps } from '../../../Table/template/templateTable.types';
import { InputText } from '../../../UI/InputText';
import { ModalWindow } from '../../../UI/ModalWindow';
import * as Styled from './SkillCreateModal.styles';

export const SkillCreateModal: FC<IModalForCreatingProps> = ({ open, onClose }) => {
  const [createSkill, { loading }] = useMutation(CREATE_SKILL);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(skillsSchema),
  });

  const onSubmit = (inputs: SkillsInput) => {
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
      .catch((err: TError) => {
        console.error(err.message);
      })

      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Create skill'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
          <InputText
            name="Skill name"
            registerName={FieldNameSkillsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message as string}
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
    </ModalWindow>
  );
};
