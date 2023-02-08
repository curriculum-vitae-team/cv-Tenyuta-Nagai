import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
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
import { GET_PROJECT } from '../../../../graphql/queries/project';
import { IProjectResult } from '../../../../graphql/types/results/projects';
import * as Styled from './../../EmployeesPage/EmployeesModal/EmployeesModal.styles';
import { IProjectModalId } from './ProjectUpdateModal.types';

export const ProjectUpdateModal = () => {
  const projectData: Pick<Partial<IProjectModalId>, keyof IProjectModalId> = useReactiveVar(
    modalService.modalData$
  );
  const { id } = useParams();
  const { data } = useQuery<IProjectResult>(GET_PROJECT, {
    variables: { id },
  });
  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProjectsFormInput>({
    defaultValues: {
      name: data?.project.name,
      internalName: data?.project.internal_name,
      description: data?.project.description,
      domain: data?.project.domain,
      teamSize: data?.project.team_size,
      startDate: data?.project.start_date,
      endDate: data?.project.end_date,
    },
    mode: 'onChange',
    resolver: yupResolver(projectsSchema),
  });

  const onSubmit: SubmitHandler<IProjectsFormInput> = (inputs) => {
    updateProject({
      variables: {
        id: projectData?.id,
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
