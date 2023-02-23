import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { TError } from '../../../../types/errorTypes';
import { modalService } from '../../../../graphql/service/modalService';
import { UPDATE_LANGUAGE } from '../../../../graphql/mutations/languages';
import { LanguageInput } from '../../../../graphql/types/inputs/language';
import { FieldNameLanguagesForm } from '../../../../constants/fieldNameLanguagesForm';
import { languagesSchema } from '../../../../utils/validationSchema';
import * as Styled from './../LanguageCreate/LanguageCreateModal.styles';
import { ILanguageUpdate } from './LanguageUpdate.interface';

export const LanguageUpdateModal = () => {
  const language: Pick<Partial<ILanguageUpdate>, keyof ILanguageUpdate> = useReactiveVar(
    modalService.modalData$
  );
  const { t } = useTranslation();

  const [updateLanguage, { loading }] = useMutation(UPDATE_LANGUAGE);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LanguageInput>({
    defaultValues: {
      name: language.name,
      iso2: language.iso2,
      nativeName: language.native_name,
    },
    mode: 'onChange',
    resolver: yupResolver(languagesSchema),
  });

  const onSubmit: SubmitHandler<LanguageInput> = (inputs) => {
    updateLanguage({
      variables: {
        id: language.id,
        language: {
          name: inputs.name,
          iso2: inputs.iso2,
          native_name: inputs.nativeName,
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
