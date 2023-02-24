import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Checkbox, Typography } from '@mui/material';
import { useUser } from '../../../../hooks/useUser';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { USER } from '../../../../graphql/queries/user';
import { CREATE_CV } from '../../../../graphql/mutations/cv';
import { ICvsCreateResult } from '../../../../graphql/types/results/cv';
import { updateCvsCacheAfterCvCreateMutation } from '../../../../graphql/cache/cv';
import { editCvSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { TError } from '../../../../types/errorTypes';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';
import { createArrayForLanguages } from '../../../../utils/createArrayForLanguages';
import { IFormCreateCv } from './CreateCvModal.types';
import * as Styled from './CreateCvModal.styles';

export const CreateCvModal = () => {
  const user = useUser();
  const { loading, data: userData } = useQuery<IUserAllResult>(USER, {
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
    formState: { errors, isValid, isSubmitted },
  } = useForm<IFormCreateCv>({
    resolver: yupResolver(editCvSchema),
  });

  const onSubmit: SubmitHandler<IFormCreateCv> = (inputs) => {
    createCV({
      variables: {
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: userData?.user.id,
          skills: createArrayForSkills(userData?.user.profile.skills),
          projectsIds: [], //TO-DO CHANGE
          languages: createArrayForLanguages(userData?.user.profile.languages),
          is_template: inputs.template,
        },
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
            name="Name"
            registerName={'name'}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message || ''}
          />

          <InputText
            name="Description"
            registerName={'description'}
            register={register}
            multiline
            maxRows={4}
            error={!!errors.description}
            helperText={errors.description?.message || ''}
          />

          <Styled.CheckboxWrap>
            <Typography>Template</Typography>
            <Checkbox {...register('template')} {...Styled.checkboxLabel} />
          </Styled.CheckboxWrap>

          <ModalWindowButton loading={createCvLoading} isValid={!isSubmitted || isValid} />
        </form>
      )}
    </>
  );
};
