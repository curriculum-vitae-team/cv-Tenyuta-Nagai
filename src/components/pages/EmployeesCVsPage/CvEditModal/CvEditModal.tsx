import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Checkbox, Typography } from '@mui/material';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UNBIND_CV, UPDATE_CV } from '../../../../graphql/mutations/cv';
import { updateUserCacheAfterCvUnbindMutation } from '../../../../graphql/cache/cv';
import { editCvSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { InputText } from '../../../UI/InputText';
import { ICvResult, ICvUnbindResult } from '../../../../graphql/types/results/cv';
import { USER } from '../../../../graphql/queries/user';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { Spinner } from '../../../Spinner';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';
import * as Styled from './CvEditModal.styles';
import { TCvId, IFormEditCv } from './CvEditModal.types';

export const CvEditModal = () => {
  const { id } = useParams();
  const { loading, data: userData } = useQuery<IUserAllResult>(USER, {
    variables: { id },
  });
  const cvId: Pick<Partial<TCvId>, keyof TCvId> = useReactiveVar(modalService.modalData$);
  const cv = userData?.user?.cvs?.filter((cv) => cv.id === cvId.id)[0];
  const [updateCV, { loading: updateCvLoading }] = useMutation<ICvResult>(UPDATE_CV);
  const [unbindCV, { loading: unbindCvLoading }] = useMutation<ICvUnbindResult>(UNBIND_CV, {
    update(cache, { data }) {
      updateUserCacheAfterCvUnbindMutation(cache, userData!.user!.id, data!);
    },
  });
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    control,
  } = useForm<IFormEditCv>({
    defaultValues: {
      name: cv?.name,
      description: cv?.description,
      template: cv?.is_template,
    },
    mode: 'onChange',
    resolver: yupResolver(editCvSchema),
  });

  const handleUnBind = () => {
    unbindCV({
      variables: {
        id: cvId.id,
      },
    })
      .then(() => {
        modalService.setAdditionalData({
          editCv: {
            id: '',
            name: '',
            description: '',
          },
        });
        modalService.closeModal();
      })
      .catch((err: TError) => {
        modalService.closeModal();
        console.error(err.message);
      });
  };

  const onSubmit: SubmitHandler<IFormEditCv> = async (inputs) => {
    updateCV({
      variables: {
        id: cvId.id,
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: userData?.user.id,
          skills: userData?.user.profile.skills.map((skill) => {
            return { skill_name: skill.skill_name, mastery: skill.mastery };
          }),
          projectsIds: [], // TO-DO change it
          languages: userData?.user.profile.languages.map((language) => {
            return { language_name: language.language_name, proficiency: language.proficiency };
          }),
          is_template: inputs.template,
        },
      },
    })
      .then((res) => {
        modalService.setAdditionalData({
          editCv: {
            id: res?.data?.updateCv?.id || '',
            name: res?.data?.updateCv?.name || '',
            description: res?.data?.updateCv?.description || '',
          },
        });
        modalService.closeModal();
      })
      .catch((err: TError) => {
        console.error(err.message);
        modalService.closeModal();
      });
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

          <Styled.ButtonsWrap>
            <ModalWindowButton
              loading={updateCvLoading || unbindCvLoading}
              isValid={checkDirtyFieldsForm(dirtyFields) && isValid}
            />

            <ModalWindowButton
              loading={updateCvLoading || unbindCvLoading}
              handleClick={handleUnBind}
              name={t('Unbind')!}
            />
          </Styled.ButtonsWrap>
        </form>
      )}
    </>
  );
};
