import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { InputText } from '../../../UI/InputText';
import { DatePickerInput } from '../../../UI/DatePicker';
import { updateCacheAfterCreatingProject } from '../../../../graphql/cache/createProject';
import { CREATE_PROJECT } from '../../../../graphql/mutations/createProject';
import { projectsSchema } from '../../../../utils/validationSchema';
import { CreateProjectResult } from '../../../../graphql/types/results/projects';
import { TError } from '../../../../types/errorTypes';
import { FieldNameProjectsForm } from '../../../../constants/FieldNameProjectsForm';
import { formatDate } from '../../../../utils/formatDate';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { IProjectsFormInput } from './ProjectsCreateModal.interface';

export const ProjectCreateModal = () => {
  const [createProject, { loading }] = useMutation<CreateProjectResult>(CREATE_PROJECT);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IProjectsFormInput>({
    resolver: yupResolver(projectsSchema),
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IProjectsFormInput> = (inputs) => {
    createProject({
      variables: {
        project: {
          name: inputs.name,
          internal_name: inputs.internalName,
          description: inputs.description,
          domain: inputs.domain,
          team_size: Number(inputs.teamSize),
          start_date: formatDate(inputs.startDate),
          end_date: formatDate(inputs.endDate),
          skillsIds: [],
        },
      },
      update(cache, { data }) {
        updateCacheAfterCreatingProject(cache, data!);
      },
    })
      .catch((err: TError) => console.error(err.message))
      .finally(() => modalService.closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputText
        name={t('Project name')}
        registerName={FieldNameProjectsForm.NAME}
        register={register}
        error={!!errors.name}
        helperText={t(errors.name?.message as string) || ''}
      />

      <InputText
        name={t('Internal name')}
        registerName={FieldNameProjectsForm.INTERNAL_NAME}
        register={register}
        error={!!errors.internalName?.message}
        helperText={t(errors.internalName?.message as string) || ''}
      />

      <InputText
        name={t('Description')}
        registerName={FieldNameProjectsForm.DESCRIPTION}
        register={register}
        error={!!errors.description}
        helperText={t(errors.description?.message as string) || ''}
        multiline
      />

      <InputText
        name={t('Domain')}
        registerName={FieldNameProjectsForm.DOMAIN}
        register={register}
        error={!!errors.domain}
        helperText={t(errors.domain?.message as string) || ''}
      />

      <InputText
        name={t('Team size')}
        registerName={FieldNameProjectsForm.TEAM_SIZE}
        register={register}
        error={!!errors.teamSize}
        helperText={t(errors.teamSize?.message as string) || ''}
      />

      <DatePickerInput
        control={control}
        label={t('Start date')}
        name={FieldNameProjectsForm.START_DATE}
        triggerName={'endDate'}
        trigger={trigger}
      />
      <DatePickerInput
        control={control}
        label={t('End date')}
        name={FieldNameProjectsForm.END_DATE}
      />

      <ModalWindowButton loading={loading} isValid={!isSubmitted || isValid} />
    </form>
  );
};
