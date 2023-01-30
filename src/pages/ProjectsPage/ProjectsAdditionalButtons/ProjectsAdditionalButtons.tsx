import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { useUser } from '../../../hooks/useUser';
import { IAdditionalButtonsProps } from '../../../components/Table/TableRows/TableRowComponent.types';
import {
  DeleteProjectInput,
  DeleteProjectResult,
} from '../../../graphql/mutations/deleteProject/deleteProject.types';
import { DELETE_PROJECT } from '../../../graphql/mutations/deleteProject/deleteProject';
import { updateCacheAfterDeleteProject } from '../../../graphql/mutations/deleteProject/deleteProject.cache';
import * as Styled from '../../EmployeesPage/EmployeesAdditionalButtons/EmployeesAdditionalButtons.styles';

export const ProjectsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const navigate = useNavigate();
  const [deleteProject] = useMutation<DeleteProjectResult, DeleteProjectInput>(DELETE_PROJECT);

  const handleProjectDelete = () => {
    deleteProject({
      variables: { id: id as string },
      update(cache) {
        updateCacheAfterDeleteProject(cache, id as string);
      },
    });
    console.log('deleted');
  };

  const handleGoToProject = () => {
    navigate(`/${RoutePath.PROJECTS}/${id}`);
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleGoToProject}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        Project
      </MenuItem>

      {isAdmin && <Divider />}

      {isAdmin && (
        <MenuItem
          onClick={handleProjectDelete}
          sx={Styled.ActionsMenuRowItemProps}
          disabled={user?.id === id && isAdmin}
        >
          <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
          Delete
        </MenuItem>
      )}
    </>
  );
};
