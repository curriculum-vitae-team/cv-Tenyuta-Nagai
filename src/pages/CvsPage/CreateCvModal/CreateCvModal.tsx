import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { Checkbox, Typography } from '@mui/material';
import { InputText } from '../../../components/UI/InputText';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { TFormSubmit } from '../../../types/formTypes';
import { editCvSchema } from '../../../utils/validationSchema';
import { ICvsCreateResult } from '../../../interfaces/ICv.interface';
import { CREATE_CV } from '../../../graphql/mutations/cv/cv';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { USER } from '../../../graphql/queries/user';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../../components/Spinner';
import { IModalForCreatingProps } from '../../../components/Table/template/templateTable.types';
import { TError } from '../../../types/errorTypes';
import { updateCvsCacheAfterCvCreateMutation } from '../../../graphql/mutations/cv/cv.cache';
import { IFormCreateCv } from './CreateCvModal.types';
import * as Styled from './CreateCvModal.styles';

export const CreateCvModal: FC<IModalForCreatingProps> = ({ open, onClose }) => {
  const user = useUser();
  const { loading, error, data: userData } = useQuery<IUserAllResult>(USER, {
    variables: { id: user?.id },
  });
  const [createCV, { loading: createCvLoading }] = useMutation<ICvsCreateResult>(CREATE_CV, {
    update(cache, { data }) {
      updateCvsCacheAfterCvCreateMutation(cache, data!, userData!);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(editCvSchema),
  });

  if (error) {
    onClose();
  }

  const onSubmit = async (inputs: IFormCreateCv) => {
    await createCV({
      variables: {
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: userData?.user.id,
          skills: [], // TO-DO change it
          projectsIds: [], // TO-DO change it
          languages: [], // TO-DO change it
          is_template: inputs.template,
        },
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Create CV'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
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
            multiline
            maxRows={4}
            error={!!errors.description}
            helperText={errors.description?.message as string}
          />

          <Styled.CheckboxWrap>
            <Typography>Template</Typography>
            <Checkbox {...register('template')} {...Styled.checkboxLabel} />
          </Styled.CheckboxWrap>

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
      )}
    </ModalWindow>
  );
};
