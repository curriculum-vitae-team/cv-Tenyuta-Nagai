import { useQuery } from '@apollo/client';
import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../components/Spinner';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { USER } from '../../../graphql/queries/user';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { DEPARTMENTS } from '../../../graphql/queries/departments';
import { IDepartmentReturn } from '../../../interfaces/IDepartment.interface';
import { POSITIONS } from '../../../graphql/queries/positions';
import { IPositionReturn } from '../../../interfaces/IPosition.interface';
import { profileSchema } from '../../../utils/validationSchema';
import { FieldNameProfileForm } from '../../../constants/fieldNameProfileForm';
import { IProfileFormInput, IProfileModalProps } from './ProfileModal.types';
import * as Styled from './ProfileModal.styles';
import { ROLE_DATA } from './data/roleData';
import { InputText } from './InputText/InputText';
import { InputSelect } from './InputSelect/InputSelect';
import { InputFile } from './InputFile/InputFile';

export const ProfileModal: FC<IProfileModalProps> = ({ userId, open, onClose }) => {
  const { loading, error, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: userId },
  });
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery<
    IDepartmentReturn
  >(DEPARTMENTS);
  const { loading: positionsLoading, error: positionsError, data: positionsData } = useQuery<
    IPositionReturn
  >(POSITIONS);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProfileFormInput>({
    defaultValues: {
      firstName: data?.user.profile.first_name || '',
      lastName: data?.user.profile.last_name || '',
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const file = watch('picture');

  if (error || departmentsError || positionsError) {
    onClose();
  }

  const onSubmit = (inputs: IProfileFormInput) => {
    console.log(inputs);
  };

  const handlerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlerOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    setValue('picture', file, { shouldValidate: true });
  };

  return (
    <ModalWindow title={'Edit profile'} onClose={onClose} open={open}>
      {loading || departmentsLoading || positionsLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.WrapperUserAvatar>
            <Styled.UserAvatar
              src={
                (!errors?.picture?.message && file?.length && URL.createObjectURL(file[0])) ||
                data?.user.profile.avatar
              }
            />

            <Styled.WrapperDropArea onDragOver={handlerDragStart} onDrop={handlerOnDrop}>
              <InputFile registerName={FieldNameProfileForm.PICTURE} register={register}>
                {'Upload file'}
              </InputFile>

              <Styled.Paragraph>{'or drag and drop the file here'}</Styled.Paragraph>

              {errors?.picture?.message ? (
                <Styled.ErrorPicture>{errors?.picture?.message}</Styled.ErrorPicture>
              ) : (
                <Styled.Paragraph>{'JPG, JPEG, PNG no more than 5 MB'}</Styled.Paragraph>
              )}
            </Styled.WrapperDropArea>
          </Styled.WrapperUserAvatar>

          <InputText
            name="First name"
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
          />

          <InputText
            name="Last name"
            registerName={FieldNameProfileForm.LAST_NAME}
            register={register}
          />

          <InputSelect
            label={'Position'}
            registerName={FieldNameProfileForm.POSITION}
            register={register}
            defaultValue={data?.user.position_name || ''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={'Department'}
            registerName={FieldNameProfileForm.DEPARTMENT}
            register={register}
            defaultValue={data?.user.department_name || ''}
            data={departmentsData!.departments}
          />

          {data?.user.role === 'admin' && (
            <InputSelect
              label={'Role'}
              registerName={FieldNameProfileForm.ROLE}
              register={register}
              defaultValue={data?.user.role || ''}
              data={ROLE_DATA}
            />
          )}

          <Button variant="contained" type="submit">
            {'Save'}
          </Button>
        </form>
      )}
    </ModalWindow>
  );
};
