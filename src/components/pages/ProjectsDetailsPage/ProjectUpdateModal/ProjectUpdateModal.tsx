import { useMutation, useReactiveVar } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../Spinner';
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
import * as Styled from './../../EmployeesPage/EmployeesModal/EmployeesModal.styles';

export const ProjectUpdateModal = () => {
  const projectData: Pick<Partial<IProjectResult>, keyof IProjectResult> = useReactiveVar(
    modalService.modalData$
  );
  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProjectsFormInput>({
    defaultValues: {
      name: projectData?.project?.name,
      internalName: projectData?.project?.internal_name,
      description: projectData?.project?.description,
      domain: projectData?.project?.domain,
      teamSize: projectData?.project?.team_size,
      startDate: projectData?.project?.start_date,
      endDate: projectData?.project?.end_date,
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
      .catch((err) => console.error((err as TError).message))
      .finally(() => modalService.closeModal());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name="Project name"
            registerName={FieldNameProjectsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message || ''}
          />

          <InputText
            name="Internal name"
            registerName={FieldNameProjectsForm.INTERNAL_NAME}
            register={register}
            error={!!errors.internalName?.message}
            helperText={errors.internalName?.message || ''}
          />

          <InputText
            name="Description"
            registerName={FieldNameProjectsForm.DESCRIPTION}
            register={register}
            error={!!errors.description}
            helperText={errors.description?.message || ''}
            multiline
          />

          <InputText
            name="Domain"
            registerName={FieldNameProjectsForm.DOMAIN}
            register={register}
            error={!!errors.domain}
            helperText={errors.domain?.message || ''}
          />

          <InputText
            name="Team size"
            registerName={FieldNameProjectsForm.TEAM_SIZE}
            register={register}
            error={!!errors.teamSize}
            helperText={errors.teamSize?.message || ''}
          />

          <DatePickerInput
            control={control}
            label="Start date"
            name={FieldNameProjectsForm.START_DATE}
            trigger={trigger}
          />
          <DatePickerInput
            control={control}
            label="End date"
            name={FieldNameProjectsForm.END_DATE}
          />

          <Styled.ButtonSubmit
            loading={loading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid}
          >
            {'Save'}
          </Styled.ButtonSubmit>
        </form>
      )}
    </>
  );
};
