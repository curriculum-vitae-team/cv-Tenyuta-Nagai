import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { editCvDetailsSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { UPDATE_CV } from '../../../../graphql/mutations/cv';
import { ICvQueryResult, ICvResult } from '../../../../graphql/types/results/cv';
import { TError } from '../../../../types/errorTypes';
import { createArrayForLanguages } from '../../../../utils/createArrayForLanguages';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';
import { IFormEditDetailsCv } from './CvEditDetailsModal.types';
import * as Styled from './CvEditDetailsModal.styles';

export const CvEditDetailsModal = () => {
  const cvData: Pick<Partial<ICvQueryResult>, keyof ICvQueryResult> = useReactiveVar(
    modalService.modalData$
  );
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    control,
  } = useForm<IFormEditDetailsCv>({
    defaultValues: {
      name: cvData?.cv?.name,
      description: cvData?.cv?.description,
      template: cvData?.cv?.is_template,
    },
    mode: 'onChange',
    resolver: yupResolver(editCvDetailsSchema),
  });

  const [updateCV, { loading: updateCvLoading }] = useMutation<ICvResult>(UPDATE_CV, {
    onError: () => modalService.closeModal(),
  });

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
      .catch((err: TError) => console.error(err.message))
      .finally(() => modalService.closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputText
        name={t('Name')}
        registerName={'name'}
        register={register}
        error={!!errors.name}
        helperText={t(errors.name?.message as string) || ''}
      />

      <InputText
        name={t('Description')}
        registerName={'description'}
        multiline
        maxRows={4}
        register={register}
        error={!!errors.description}
        helperText={t(errors.description?.message as string) || ''}
      />

      <Styled.CheckboxWrap>
        <Typography>{t('Template')}</Typography>
        <Controller
          name={'template'}
          control={control}
          render={({ field: props }) => (
            <Checkbox
              {...props}
              checked={props.value}
              onChange={(e) => props.onChange(e.target.checked)}
            />
          )}
        />
      </Styled.CheckboxWrap>

      <ModalWindowButton
        loading={updateCvLoading}
        isValid={checkDirtyFieldsForm(dirtyFields) && isValid}
      />
    </form>
  );
};
