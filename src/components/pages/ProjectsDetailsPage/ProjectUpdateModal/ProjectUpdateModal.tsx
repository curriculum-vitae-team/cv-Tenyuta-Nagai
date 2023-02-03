import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { ModalWindow } from '../../../UI/ModalWindow';
import { DatePickerInput } from '../../../UI/DatePicker';
import { CREATE_PROJECT } from '../../../../graphql/mutations/createProject';
import { projectsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { FieldNameProjectsForm } from '../../../../constants/FieldNameProjectsForm';
import { TFormSubmit } from '../../../../types/formTypes';
import { IProjectsFormInput } from '../../ProjectsPage/ProjectsCreateModal/ProjectsCreateModal.interface';
import { UPDATE_PROJECT } from '../../../../graphql/mutations/updateProject';
import * as Styled from './../../EmployeesPage/EmployeesModal/EmployeesModal.styles';
import { IProjectsModalProps } from './ProjectUpdateModal.types';

export const ProjectUpdateModal: FC<IProjectsModalProps> = ({ open, onClose, projectData }) => {
  const [updateProject, { loading, error }] = useMutation<IUserAllResult>(UPDATE_PROJECT);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
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

  if (error) {
    onClose();
  }

  const onSubmit = (inputs: IProjectsFormInput) => {
    updateProject({
      variables: {
        id: projectData?.project.id,
        project: {
          name: inputs.name,
          internal_name: inputs.internalName,
          description: inputs.description,
          domain: inputs.domain,

          team_size: Number(inputs.teamSize),
          start_date: format(new Date(inputs.startDate), 'yyyy-MM-dd'),
          end_date: inputs.endDate ? format(new Date(inputs.endDate), 'yyyy-MM-dd') : null,
          skillsIds: [],
        },
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Update project'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
          <InputText
            name="Project name"
            registerName={FieldNameProjectsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />

          <InputText
            name="Internal name"
            registerName={FieldNameProjectsForm.INTERNAL_NAME}
            register={register}
            error={!!errors.internalName?.message}
            helperText={errors.internal_name?.message as string}
          />

          <InputText
            name="Description"
            registerName={FieldNameProjectsForm.DESCRIPTION}
            register={register}
            error={!!errors.description}
            helperText={errors.description?.message as string}
            multiline
          />

          <InputText
            name="Domain"
            registerName={FieldNameProjectsForm.DOMAIN}
            register={register}
            error={!!errors.domain}
            helperText={errors.domain?.message as string}
          />

          <InputText
            name="Team size"
            registerName={FieldNameProjectsForm.TEAM_SIZE}
            register={register}
            error={!!errors.teamSize}
            helperText={errors.teamSize?.message as string}
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
    </ModalWindow>
  );
};
