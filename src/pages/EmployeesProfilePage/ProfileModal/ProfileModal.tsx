import { useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { Box, Button, MenuItem, TextField } from '@mui/material';
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
import { IProfileFormInput, IProfileModalProps } from './ProfileModal.types';
import * as Styled from './ProfileModal.styles';

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
  const [department, setDepartment] = useState(data?.user.department_name || '');
  const [position, setPosition] = useState(data?.user.position_name || '');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProfileFormInput>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const file = watch('picture');

  if (error || departmentsError || positionsError) {
    onClose();
  }

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDepartment(e.target.value);
  };

  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPosition(e.target.value);
  };

  const onSubmit = (inputs: IProfileFormInput) => {
    console.log(inputs.picture[0]);
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Styled.UserAvatar
              sx={{ width: 80, height: 80 }}
              src={
                (!errors?.picture?.message &&
                  file &&
                  file.length &&
                  URL.createObjectURL(file[0])) ||
                data?.user.profile.avatar
              }
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                border: '1px dashed #000',
                borderRadius: '8px',
                textAlign: 'center',
              }}
              onDragOver={handlerDragStart}
              onDrop={handlerOnDrop}
            >
              <Box
                component="label"
                sx={{ color: 'secondary.main', fontSize: 20, ':hover': { cursor: 'pointer' } }}
              >
                {'Upload file'}
                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                  {...register('picture')}
                />
              </Box>
              <Box component="p">{'or drag and drop the file here'}</Box>
              <Box component="p">
                {errors?.picture?.message || 'JPG, JPEG, PNG no more than 5 MB'}
              </Box>
            </Box>
          </Box>

          <TextField
            name={'First name'}
            fullWidth
            margin="normal"
            label="First name"
            defaultValue={data?.user.profile.first_name || ''}
          />

          <TextField
            name={'Last name'}
            fullWidth
            margin="normal"
            label="Last name"
            defaultValue={data?.user.profile.last_name || ''}
          />

          <TextField
            value={position}
            onChange={handleChangePosition}
            fullWidth
            margin="normal"
            select
            label="Position"
          >
            {positionsData?.positions.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={department}
            onChange={handleChangeDepartment}
            fullWidth
            margin="normal"
            select
            label="Department"
          >
            {departmentsData?.departments.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" type="submit">
            {'Save'}
          </Button>
        </form>
      )}
    </ModalWindow>
  );
};
