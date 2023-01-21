import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import { Spinner } from '../../../components/Spinner';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { USER } from '../../../graphql/queries/user';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { DEPARTMENTS } from '../../../graphql/queries/departments';
import { IDepartmentReturn } from '../../../interfaces/IDepartment.interface';
import { POSITIONS } from '../../../graphql/queries/positions';
import { IPositionReturn } from '../../../interfaces/IPosition.interface';
import { IProfileModalProps } from './ProfileModal.types';
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

  useEffect(() => {
    if (departmentsData) {
      console.log(1, departmentsData);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (positionsData) {
      console.log(2, positionsData);
    }
  }, [positionsData]);

  if (error || departmentsError || positionsError) {
    onClose();
  }

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDepartment(e.target.value);
  };

  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPosition(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <ModalWindow title={'Edit profile'} onClose={onClose} open={open}>
      {loading || departmentsLoading || positionsLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <Styled.UserAvatar src={data?.user.profile.avatar}></Styled.UserAvatar>

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
