import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserRoles } from '../../../../constants/userRoles';
import { useUser } from '../../../../hooks/useUser';
import { TError } from '../../../../types/errorTypes';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { ICvsDeleteResult } from '../../../../graphql/types/results/cv';
import { DELETE_CV } from '../../../../graphql/mutations/cv';
import { updateCvsCacheAfterCvDeleteMutation } from '../../../../graphql/cache/cv';
import { RoutePath } from '../../../../constants/routeVariables';
import * as Styled from './CvsAdditionalButtons.styles';

export const CvsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, employee } = item;
  const user = useUser();
  const navigate = useNavigate();
  const isAdmin = user?.role === UserRoles.Admin;
  const isOwnerCv = user?.email === employee;
  const { t } = useTranslation();
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
    navigate(`/${RoutePath.CVS}/${id}/${RoutePath.DETAILS}`);
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
        {t('Details')}
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={handleDeleteCv}
        sx={Styled.ActionsMenuRowItemProps}
        disabled={disableDeleteButton()}
      >
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        {t('Delete')}
      </MenuItem>
    </>
  );
};
