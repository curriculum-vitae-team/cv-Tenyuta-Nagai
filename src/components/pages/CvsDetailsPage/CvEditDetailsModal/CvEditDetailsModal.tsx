import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { TFormSubmit } from '../../../../types/formTypes';
import { editCvDetailsSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { ModalWindow } from '../../../UI/ModalWindow';
import { UPDATE_CV } from '../../../../graphql/mutations/cv';
import { ICvResult } from '../../../../graphql/types/results/cv';
import { TError } from '../../../../types/errorTypes';
import { ICvEditModalProps, IFormEditDetailsCv } from './CvEditDetailsModal.types';
import * as Styled from './CvEditDetailsModal.styles';

export const CvEditDetailsModal: FC<ICvEditModalProps> = ({ open, onClose, cvData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      name: cvData?.cv?.name,
      description: cvData?.cv?.description,
    },
    mode: 'onChange',
    resolver: yupResolver(editCvDetailsSchema),
  });
  const [isTemplate, setIsTemplate] = useState(cvData?.cv?.is_template);
  const [updateCV, { loading: updateCvLoading, error: updateCvError }] = useMutation<ICvResult>(
    UPDATE_CV
  );

  if (updateCvError) {
    onClose();
  }

  const handleChangeTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTemplate(e.target.checked);
  };

  const onSubmit = (inputs: IFormEditDetailsCv) => {
    updateCV({
      variables: {
        id: cvData?.cv.id,
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: cvData?.cv.user?.id,
          skills: cvData?.cv.skills.map(({ skill_name, mastery }) => {
            return { skill_name, mastery };
          }),
          projectsIds: cvData?.cv?.projects?.map((project) => project.id),
          languages: cvData?.cv.languages.map(({ language_name, proficiency }) => {
            return { language_name, proficiency };
          }),
          is_template: inputs.template,
        },
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Edit CV'} onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
        <InputText
          name="Name"
          registerName={'name'}
          register={register}
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />

        <InputText
          name="Description"
          registerName={'description'}
          multiline
          maxRows={4}
          register={register}
          error={!!errors.description}
          helperText={errors.description?.message as string}
        />

        <Styled.CheckboxWrap>
          <Typography>Template</Typography>
          <Checkbox
            {...register('template')}
            {...Styled.checkboxLabel}
            checked={isTemplate}
            onChange={handleChangeTemplate}
          />
        </Styled.CheckboxWrap>

        <Styled.Button
          loading={updateCvLoading}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={!isValid}
        >
          Save
        </Styled.Button>
      </form>
    </ModalWindow>
  );
};
