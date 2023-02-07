import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { ModalWindow } from '../../../UI/ModalWindow';
import { DatePickerInput } from '../../../UI/DatePicker';
import { updateCacheAfterCreatingProject } from '../../../../graphql/cache/createProject';
import { CREATE_PROJECT } from '../../../../graphql/mutations/createProject';
import { projectsSchema } from '../../../../utils/validationSchema';
import { CreateProjectResult, IProjectsResult } from '../../../../graphql/types/results/projects';
import { TError } from '../../../../types/errorTypes';
import { FieldNameProjectsForm } from '../../../../constants/FieldNameProjectsForm';
import { formatDate } from '../helpers/formatDate';
import * as Styled from './../../EmployeesPage/EmployeesModal/EmployeesModal.styles';
import { IProjectsFormInput, IProjectsModalProps } from './ProjectsCreateModal.interface';

export const ProjectCreateModal: FC<IProjectsModalProps> = ({ open, onClose }) => {
  const [createProject, { loading }] = useMutation<IProjectsResult>(CREATE_PROJECT);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProjectsFormInput>({
    mode: 'onChange',
    resolver: yupResolver(projectsSchema),
  });

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
        updateCacheAfterCreatingProject(cache, (data as unknown) as CreateProjectResult);
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Create new project'} onClose={onClose} open={open}>
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
            helperText={errors.internal_name?.message || ''}
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
            triggerName={'endDate'}
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
