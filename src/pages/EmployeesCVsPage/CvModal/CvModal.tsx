import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { Checkbox } from '@mui/material';
import { InputText } from '../../../components/UI/InputText';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { TFormSubmit } from '../../../types/formTypes';
import { editCvSchema } from '../../../utils/validationSchema';
import { ICvResult } from '../../../interfaces/ICv.interface';
import { CREATE_CV } from '../../../graphql/mutations/cv/cv';
import { ICvModalProps, IFormCreateCv } from './CvModal.types';
import * as Styled from './CvModal.styles';

export const CvModal: FC<ICvModalProps> = ({ open, onClose, userData }) => {
  const [createCV, { loading: createCvLoading }] = useMutation<ICvResult>(CREATE_CV);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(editCvSchema),
  });

  const onSubmit = async (inputs: IFormCreateCv) => {
    console.log(inputs);
    const res = await createCV({
      variables: {
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: userData?.user.id,
          skills: [], // TO-DO change it
          projectsIds: [], // TO-DO change it
          languages: [], // TO-DO change it
          is_template: false,
        },
      },
    });

    console.log(res);
  };

  return (
    <ModalWindow title={'Create CV'} onClose={onClose} open={open}>
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
          register={register}
          error={!!errors.description}
          helperText={errors.description?.message as string}
        />

        <Styled.ButtonSubmit
          loading={createCvLoading}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={!isValid}
        >
          Save
        </Styled.ButtonSubmit>
      </form>
    </ModalWindow>
  );
};
