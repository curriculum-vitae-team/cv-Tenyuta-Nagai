import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { TableRowProps } from './TableRowComponent.types';
import {
  ActionsMenuRowIconsProps,
  ActionsMenuRowItemProps,
  ActionsMenuRowProps,
} from './TableRowComponent.styles';

const TableRowComponent = ({ children, handleDelete, id, TableUpdateModal }: TableRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleEdit = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = (): void => {
    handleDelete(id);
    console.log('deleted');
  };

  return (
    <>
      <TableRow>
        {children}

        <TableCell>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: ActionsMenuRowProps,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          sx={ActionsMenuRowItemProps}
          onClick={handleEdit}
          disabled={user?.id !== id && user?.role !== UserRoles.Admin}
        >
          <UpdateIcon sx={ActionsMenuRowIconsProps} />
          Update
        </MenuItem>

        {user?.role === UserRoles.Admin && (
          <MenuItem onClick={handleDeleteUser} sx={ActionsMenuRowItemProps}>
            <DeleteOutlineIcon sx={ActionsMenuRowIconsProps} />
            Delete
          </MenuItem>
        )}
      </Menu>
      {isOpenModal && (
        <TableUpdateModal userId={id!} open={isOpenModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export { TableRowComponent };
