import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { editCvDetailsSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { UPDATE_CV } from '../../../../graphql/mutations/cv';
import { ICvQueryResult, ICvResult } from '../../../../graphql/types/results/cv';
import { TError } from '../../../../types/errorTypes';
import { createArrayForLanguages } from '../../../../utils/createArrayForLanguages';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';
import { modalService } from '../../../../graphql/service/modalService';
import { IFormEditDetailsCv } from './CvEditDetailsModal.types';
import * as Styled from './CvEditDetailsModal.styles';

export const CvEditDetailsModal = () => {
  const cvData: Pick<Partial<ICvQueryResult>, keyof ICvQueryResult> = useReactiveVar(
    modalService.modalData$
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormEditDetailsCv>({
    defaultValues: {
      name: cvData?.cv?.name,
      description: cvData?.cv?.description,
    },
    mode: 'onChange',
    resolver: yupResolver(editCvDetailsSchema),
  });
  const [isTemplate, setIsTemplate] = useState(cvData?.cv?.is_template);

  const [updateCV, { loading: updateCvLoading }] = useMutation<ICvResult>(UPDATE_CV, {
    onError: () => modalService.closeModal(),
  });

  const handleChangeTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTemplate(e.target.checked);
  };

  const onSubmit = (inputs: IFormEditDetailsCv) => {
    updateCV({
      variables: {
        id: cvData?.cv?.id,
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: cvData?.cv?.user?.id,
          skills: createArrayForSkills(cvData?.cv?.skills),
          projectsIds: cvData?.cv?.projects?.map((project) => project.id),
          languages: createArrayForLanguages(cvData?.cv?.languages),
          is_template: inputs.template,
        },
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => modalService.closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputText
        name="Name"
        registerName={'name'}
        register={register}
        error={!!errors.name}
        helperText={errors.name?.message || ''}
      />

      <InputText
        name="Description"
        registerName={'description'}
        multiline
        maxRows={4}
        register={register}
        error={!!errors.description}
        helperText={errors.description?.message || ''}
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
  );
};
