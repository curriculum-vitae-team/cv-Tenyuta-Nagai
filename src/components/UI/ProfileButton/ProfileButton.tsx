import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../graphql/authentication/authService';
import { RoutePath } from '../../../constants/routeVariables';
import {
  AvatarProfileButtons,
  IconStyleProfileButtons,
  PaperPropsProfileButtons,
  TypographyEmailProfileButtons,
  WrapProfileButtons,
} from './profileButton.styles';

export const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentUser = useReactiveVar(authService.user$);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.clearStorage();
    navigate(`/${RoutePath.LOGIN}`);
  };

  const handleGoToProfile = () => {
    navigate(`/${RoutePath.EMPLOYEES}/${currentUser?.id}/${RoutePath.PROFILE}`);
  };

  return (
    <>
      <WrapProfileButtons>
        <TypographyEmailProfileButtons>{currentUser?.email}</TypographyEmailProfileButtons>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AvatarProfileButtons>{currentUser?.email[0].toUpperCase()}</AvatarProfileButtons>
          </IconButton>
        </Tooltip>
      </WrapProfileButtons>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: PaperPropsProfileButtons,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleGoToProfile}>
          <AccountCircleIcon sx={IconStyleProfileButtons} />
          Profile
        </MenuItem>

        <MenuItem>
          <SettingsIcon sx={IconStyleProfileButtons} />
          Setting
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <Logout sx={IconStyleProfileButtons} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
