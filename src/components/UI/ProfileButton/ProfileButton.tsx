import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { USER } from '../../../graphql/queries/user';
import { RoutePath } from '../../../constants/routeVariables';
import { useUser } from '../../../hooks/useUser';
import { chooseAvatarLetter } from '../../../utils/chooseAvatarLetter';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { authService } from '../../../graphql/service/authentication/authService';
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
  const currentUser = useUser();
  const navigate = useNavigate();
  const { data: userData } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentUser?.id },
  });
  const { t } = useTranslation();

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
        <TypographyEmailProfileButtons>
          {currentUser?.profile?.full_name || currentUser?.email}
        </TypographyEmailProfileButtons>
        <Tooltip title={t('Account settings')}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AvatarProfileButtons src={userData?.user?.profile?.avatar}>
              {chooseAvatarLetter(currentUser!)}
            </AvatarProfileButtons>
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
          {t('Profile')}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <Logout sx={IconStyleProfileButtons} />
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
};
