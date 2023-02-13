import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
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
import { ModalWindowButton } from '../../../UI/ModalWindowButton';

export const LanguageCreateModal = () => {
  const [createLanguage, { loading }] = useMutation<CreateLanguageResult>(CREATE_LANGUAGE);
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
            name="Language"
            registerName={FieldNameLanguagesForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message || ''}
          />

          <InputText
            name="ISO2"
            registerName={FieldNameLanguagesForm.ISO2}
            register={register}
            error={!!errors.iso2}
            helperText={errors.iso2?.message || ''}
          />

          <InputText
            name="Native name"
            registerName={FieldNameLanguagesForm.NATIVE}
            register={register}
            error={!!errors.nativeName}
            helperText={errors.nativeName?.message || ''}
          />

          <ModalWindowButton loading={loading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
