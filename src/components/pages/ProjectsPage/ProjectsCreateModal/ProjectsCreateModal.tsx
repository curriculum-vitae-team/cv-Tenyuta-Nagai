import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';

import { Grid } from '@mui/material';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { ModalWindow } from '../../../UI/ModalWindow';
import { DatePickerInput } from '../../../UI/DatePicker';
import { updateCacheAfterCreatingProject } from '../../../../graphql/cache/createProject';
import { CREATE_PROJECT } from '../../../../graphql/mutations/createProject';
import { projectsSchema } from '../../../../utils/validationSchema';
import { CreateProjectResult } from '../../../../graphql/types/results/projects';
import { TError } from '../../../../types/errorTypes';
import { FieldNameProjectsForm } from '../../../../constants/FieldNameProjectsForm';
import { TFormSubmit } from '../../../../types/formTypes';
import * as Styled from './../../EmployeesPage/EmployeesModal/EmployeesModal.styles';
import { IProjectsFormInput, IProjectsModalProps } from './ProjectsCreateModal.interface';

export const ProjectCreateModal: FC<IProjectsModalProps> = ({ open, onClose }) => {
  const [createProject, { loading }] = useMutation<IUserAllResult>(CREATE_PROJECT);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(projectsSchema),
  });

  const onSubmit = (inputs: IProjectsFormInput) => {
    createProject({
      variables: {
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
          <Grid sx={{ mt: '15px' }}>
            <DatePickerInput
              control={control}
              label="Start date"
              name={FieldNameProjectsForm.START_DATE}
              required={'Start date is required'}
            />
            <DatePickerInput
              control={control}
              label="End date"
              name={FieldNameProjectsForm.END_DATE}
            />
          </Grid>

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
