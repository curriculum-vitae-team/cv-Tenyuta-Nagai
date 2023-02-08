import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { ModalWindow } from '../../../UI/ModalWindow';
import { skillsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { FieldNameSkillsForm } from '../../../../constants/fieldNameSkillsForm';
import { SkillsInput } from '../../../../graphql/types/inputs/skill';
import { UPDATE_SKILL } from '../../../../graphql/mutations/skills';
import * as Styled from './SkillUpdate.styles';
import { ISkillUpdateModalProps } from './SkillUpdate.interface';

export const SkillsUpdateModal: FC<ISkillUpdateModalProps> = ({ open, onClose, skill }) => {
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
      .catch((err: TError) => {
        console.error(err.message);
      })
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Update skill'} onClose={onClose} open={open}>
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
    </ModalWindow>
  );
};
