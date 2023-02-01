import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import * as Styled from '../../EmployeesPage/EmployeesAdditionalButtons/EmployeesAdditionalButtons.styles';
import { useUser } from '../../../../hooks/useUser';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { UserRoles } from '../../../../constants/userRoles';
import { DeleteProjectResult } from '../../../../graphql/types/results/projects';
import { DeleteProjectInput } from '../../../../graphql/types/inputs/projects';
import { DELETE_PROJECT } from '../../../../graphql/mutations/deleteProject';
import { updateCacheAfterDeleteProject } from '../../../../graphql/cache/deleteProject';

export const ProjectsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const [deleteProject] = useMutation<DeleteProjectResult, DeleteProjectInput>(DELETE_PROJECT);

  const handleProjectDelete = () => {
    deleteProject({
      variables: { id: id as string },
      update(cache) {
        updateCacheAfterDeleteProject(cache, id as string);
      },
    });
  };

  const handleGoToProject = () => {
    console.log('project');
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
