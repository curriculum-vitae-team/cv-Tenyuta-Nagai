import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Checkbox } from '@mui/material';
import { useMutation } from '@apollo/client';
import { InputText } from '../../../components/UI/InputText';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { TFormSubmit } from '../../../types/formTypes';
import { editCvSchema } from '../../../utils/validationSchema';
import { ICvResult } from '../../../interfaces/ICv.interface';
import { UPDATE_CV } from '../../../graphql/mutations/cv';
import { TError } from '../../../types/errorTypes';
import { ICvEditModalProps, IFormEditCv } from './CvEditModal.types';
import * as Styled from './CvEditModal.styles';

export const CvEditModal: FC<ICvEditModalProps> = ({ open, onClose, cvId, userData }) => {
  const cv = userData?.user.cvs?.filter((x) => x.id === cvId)[0];
  const [updateCV, { loading: updateCvLoading }] = useMutation<ICvResult>(UPDATE_CV);
  const [isTemplate, setIsTemplate] = useState(cv?.is_template);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      name: cv?.name,
      description: cv?.description,
    },
    mode: 'onChange',
    resolver: yupResolver(editCvSchema),
  });

  const handleChangeTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTemplate(e.target.checked);
  };

  const handleUnBind = () => {};

  const onSubmit = async (inputs: IFormEditCv) => {
    updateCV({
      variables: {
        id: cvId,
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: userData?.user.id,
          skills: userData?.user.profile.skills,
          projectsIds: [], // TO-DO change it
          languages: userData?.user.profile.languages,
          is_template: inputs.template,
        },
      },
    })
      .then((res) =>
        onClose({
          id: res?.data?.updateCv?.id || '',
          name: res?.data?.updateCv?.name || '',
          description: res?.data?.updateCv?.description || '',
        })
      )
      .catch((err) => console.error((err as TError).message));
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
          Template
          <Checkbox
            {...register('template')}
            {...Styled.checkboxLabel}
            checked={isTemplate}
            onChange={handleChangeTemplate}
          />
        </Styled.CheckboxWrap>

        <Styled.ButtonsWrap>
          <Styled.ButtonSubmit
            loading={updateCvLoading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid}
          >
            Save
          </Styled.ButtonSubmit>

          <Styled.ButtonUnBind variant="contained" fullWidth size="large" onClick={handleUnBind}>
            Unbind
          </Styled.ButtonUnBind>
        </Styled.ButtonsWrap>
      </form>
    </ModalWindow>
  );
};
