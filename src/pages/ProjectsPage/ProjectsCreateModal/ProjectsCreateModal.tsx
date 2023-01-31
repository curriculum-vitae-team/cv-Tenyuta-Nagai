import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../components/Spinner';
import { InputText } from '../../../components/UI/InputText';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { TFormSubmit } from '../../../types/formTypes';
import { TError } from '../../../types/errorTypes';
import { CREATE_PROJECT } from '../../../graphql/mutations/createProject/createProject';
import { FieldNameProjectsForm } from '../../../constants/FieldNameProjectsForm';
import { projectsSchema } from '../../../utils/validationSchema';
import * as Styled from './../../EmployeesPage/EmployeesModal/EmployeesModal.styles';
import { IProjectsFormInput, IProjectsModalProps } from './ProjectsCreateModal.interface';

export const ProjectCreateModal: FC<IProjectsModalProps> = ({ open, onClose }) => {
  const [createProject, { loading }] = useMutation<IUserAllResult>(CREATE_PROJECT);
  const {
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
          start_date: inputs.startDate,
          end_date: inputs.endDate,
          skillsIds: [],
        },
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

          <InputText
            name="Start date"
            registerName={FieldNameProjectsForm.START_DATE}
            register={register}
            error={!!errors.startDate}
            helperText={errors.startDate?.message as string}
          />

          <InputText
            name="End date"
            registerName={FieldNameProjectsForm.END_DATE}
            register={register}
            error={!!errors.endDate}
            helperText={errors.endDate?.message as string}
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
