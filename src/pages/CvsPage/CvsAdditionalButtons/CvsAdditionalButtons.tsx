import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { UserRoles } from '../../../constants/userRoles';
import { useUser } from '../../../hooks/useUser';
import { IAdditionalButtonsProps } from '../../../components/Table/TableRows/TableRowComponent.types';
import { DELETE_CV } from '../../../graphql/mutations/cv/cv';
import { TError } from '../../../types/errorTypes';
import { ICvsDeleteResult } from '../../../interfaces/ICv.interface';
import { updateCvsCacheAfterCvDeleteMutation } from '../../../graphql/mutations/cv/cv.cache';
import * as Styled from './CvsAdditionalButtons.styles';

export const CvsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, employee } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const isOwnerCv = user?.email === employee;
  const navigate = useNavigate();
  const [deleteCv] = useMutation<ICvsDeleteResult>(DELETE_CV, {
    update(cache) {
      updateCvsCacheAfterCvDeleteMutation(cache, id as string);
    },
  });

  const handleDeleteCv = () => {
    deleteCv({
      variables: {
        id: id as string,
      },
    }).catch((err) => console.error((err as TError).message));
  };

  const handleGoToDetails = () => {
    console.log('details', id, employee);
  };

  const disableDeleteButton = () => {
    if (isAdmin) {
      return false;
    }
    return !isOwnerCv && !isAdmin;
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleGoToDetails}>
        <InfoOutlinedIcon sx={Styled.ActionsMenuRowIconsProps} />
        Details
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={handleDeleteCv}
        sx={Styled.ActionsMenuRowItemProps}
        disabled={disableDeleteButton()}
      >
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        Delete
      </MenuItem>
    </>
  );
};
