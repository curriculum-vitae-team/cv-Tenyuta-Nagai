import { useMutation, useReactiveVar } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { InputText } from '../../../UI/InputText';
import { DatePickerInput } from '../../../UI/DatePicker';
import { projectsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { FieldNameProjectsForm } from '../../../../constants/FieldNameProjectsForm';
import { IProjectsFormInput } from '../../ProjectsPage/ProjectsCreateModal/ProjectsCreateModal.interface';
import { UPDATE_PROJECT } from '../../../../graphql/mutations/updateProject';
import { formatDate } from '../../../../utils/formatDate';
import { modalService } from '../../../../graphql/service/modalService';
import { IProjectResult } from '../../../../graphql/types/results/projects';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';

export const ProjectUpdateModal = () => {
  const projectData: Pick<Partial<IProjectResult>, keyof IProjectResult> = useReactiveVar(
    modalService.modalData$
  );
  const { t } = useTranslation();
  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IProjectsFormInput>({
    defaultValues: {
      name: projectData?.project?.name,
      internalName: projectData?.project?.internal_name,
      description: projectData?.project?.description,
      domain: projectData?.project?.domain,
      teamSize: projectData?.project?.team_size,
      startDate: dayjs(projectData?.project?.start_date).format(),
      endDate: dayjs(projectData?.project?.end_date).format() || undefined,
    },
    mode: 'onChange',
    resolver: yupResolver(projectsSchema),
  });

  const onSubmit: SubmitHandler<IProjectsFormInput> = (inputs) => {
    updateProject({
      variables: {
        id: projectData?.project?.id,
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
        trigger={trigger}
        triggerName={FieldNameProjectsForm.END_DATE}
      />

      <DatePickerInput
        control={control}
        label={t('End date')}
        name={FieldNameProjectsForm.END_DATE}
      />

      <ModalWindowButton loading={loading} isValid={checkDirtyFieldsForm(dirtyFields) && isValid} />
    </form>
  );
};
