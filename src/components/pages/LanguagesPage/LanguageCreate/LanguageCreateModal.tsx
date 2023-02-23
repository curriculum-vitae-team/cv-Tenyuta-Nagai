import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TError } from '../../../../types/errorTypes';
import { languagesSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { modalService } from '../../../../graphql/service/modalService';
import { CREATE_LANGUAGE } from '../../../../graphql/mutations/languages';
import { LanguageInput } from '../../../../graphql/types/inputs/language';
import { updateCacheAfterCreatingLanguage } from '../../../../graphql/cache/languages';
import { CreateLanguageResult } from '../../../../graphql/types/results/language';
import { FieldNameLanguagesForm } from '../../../../constants/fieldNameLanguagesForm';
import * as Styled from './LanguageCreateModal.styles';

export const LanguageCreateModal = () => {
  const [createLanguage, { loading }] = useMutation<CreateLanguageResult>(CREATE_LANGUAGE);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LanguageInput>({
    mode: 'onChange',
    resolver: yupResolver(languagesSchema),
  });

  const onSubmit: SubmitHandler<LanguageInput> = (inputs) => {
    createLanguage({
      variables: {
        language: {
          name: inputs.name,
          iso2: inputs.iso2,
          native_name: inputs.nativeName || '',
        },
      },
      update(cache, { data }) {
        updateCacheAfterCreatingLanguage(cache, data!);
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
            name={t('Language')}
            registerName={FieldNameLanguagesForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={t(errors.name?.message as string) || ''}
          />

          <InputText
            name="ISO2"
            registerName={FieldNameLanguagesForm.ISO2}
            register={register}
            error={!!errors.iso2}
            helperText={t(errors.iso2?.message as string) || ''}
          />

          <InputText
            name={t('Native name')}
            registerName={FieldNameLanguagesForm.NATIVE}
            register={register}
            error={!!errors.nativeName}
            helperText={t(errors.nativeName?.message as string) || ''}
          />

          <Styled.ButtonSubmit
            loading={loading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid}
          >
            {t('Save')}
          </Styled.ButtonSubmit>
        </form>
      )}
    </>
  );
};
