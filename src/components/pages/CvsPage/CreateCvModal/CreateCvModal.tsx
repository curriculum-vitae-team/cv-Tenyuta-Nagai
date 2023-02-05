import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { Checkbox, Typography } from '@mui/material';
import { IModalForCreatingProps } from '../../../Table/template/templateTable.types';
import { useUser } from '../../../../hooks/useUser';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { USER } from '../../../../graphql/queries/user';
import { CREATE_CV } from '../../../../graphql/mutations/cv';
import { ICvsCreateResult } from '../../../../graphql/types/results/cv';
import { updateCvsCacheAfterCvCreateMutation } from '../../../../graphql/cache/cv';
import { editCvSchema } from '../../../../utils/validationSchema';
import { ModalWindow } from '../../../UI/ModalWindow';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { TFormSubmit } from '../../../../types/formTypes';
import { TError } from '../../../../types/errorTypes';
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
