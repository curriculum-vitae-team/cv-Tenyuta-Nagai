import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Checkbox, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
import { IFormCreateCv } from './CreateCvModal.types';
import * as Styled from './CreateCvModal.styles';

export const CreateCvModal = () => {
  const user = useUser();
  const { t } = useTranslation();
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
          skills: [], // TO-DO change it
          projectsIds: [], // TO-DO change it
          languages: [], // TO-DO change it
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
            name={t('Name')}
            registerName={'name'}
            register={register}
            error={!!errors.name}
            helperText={t(errors.name?.message as string) || ''}
          />

          <InputText
            name={t('Description')}
            registerName={'description'}
            register={register}
            multiline
            maxRows={4}
            error={!!errors.description}
            helperText={t(errors.description?.message as string) || ''}
          />

          <Styled.CheckboxWrap>
            <Typography>{t('Template')}</Typography>
            <Checkbox {...register('template')} {...Styled.checkboxLabel} />
          </Styled.CheckboxWrap>

          <ModalWindowButton loading={createCvLoading} isValid={!isSubmitted || isValid} />
        </form>
      )}
    </>
  );
};
