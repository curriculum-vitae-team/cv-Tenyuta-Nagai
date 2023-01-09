import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../hooks/useAuth';
import { AuthButtons } from '../UI/AuthButtons';
import { ProfileButton } from '../UI/ProfileButton';
import { BurgerMenu } from '../UI/BurgerMenu';
import { ToolbarHeader } from './header.styles';

export const Header = () => {
  const isAuth = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <ToolbarHeader disableGutters={true} auth={isAuth.toString()}>
          {isAuth ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="secondary"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpenMenu}
              >
                <MenuIcon />
              </IconButton>
              <ProfileButton />
              <BurgerMenu open={isOpenMenu} onClose={handleCloseMenu} />
            </>
          ) : (
            <AuthButtons />
          )}
        </ToolbarHeader>
      </Container>
    </AppBar>
  );
};
