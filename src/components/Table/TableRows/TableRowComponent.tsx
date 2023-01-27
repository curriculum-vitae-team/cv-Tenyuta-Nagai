import { MoreVert } from '@mui/icons-material';
import { Divider, IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { RoutePath } from '../../../constants/routeVariables';
import { TableRowProps } from './TableRowComponent.types';
import {
  ActionsMenuRowIconsProps,
  ActionsMenuRowItemProps,
  ActionsMenuRowProps,
} from './TableRowComponent.styles';

const TableRowComponent = ({
  children,
  handleDelete,
  id,
  buttonUpdateTitle,
  buttonUpdatePagePath,
}: TableRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = (): void => {
    handleDelete(id);
  };

  const handleGoToProfile = () => {
    navigate(`/${RoutePath.EMPLOYEES}/${id}/${buttonUpdatePagePath}`);
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
          onClick={handleGoToProfile}
          disabled={user?.id !== id && !isAdmin}
        >
          <UpdateIcon sx={ActionsMenuRowIconsProps} />
          {buttonUpdateTitle}
        </MenuItem>
        {isAdmin && <Divider />}

        {isAdmin && (
          <MenuItem
            onClick={handleDeleteItem}
            sx={ActionsMenuRowItemProps}
            disabled={user?.id === id && isAdmin}
          >
            <DeleteOutlineIcon sx={ActionsMenuRowIconsProps} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export { TableRowComponent };
