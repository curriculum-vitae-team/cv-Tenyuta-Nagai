import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  PaperPropsProfileButtons,
  TypographyEmailProfileButtons,
  WrapProfileButtons,
} from './profileButton.styles';

export const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const email = 'TestEmail@gmail.com'; //TO-DO replace it

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <WrapProfileButtons>
        <TypographyEmailProfileButtons>{email}</TypographyEmailProfileButtons>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, ml: 1, backgroundColor: 'secondary.main' }}>
              {email[0].toUpperCase()}
            </Avatar>
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
        <MenuItem>
          <AccountCircleIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
          Profile
        </MenuItem>

        <MenuItem>
          <SettingsIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
          Setting
        </MenuItem>

        <Divider />

        <MenuItem>
          <Logout sx={{ color: 'secondary.contrastText', mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
