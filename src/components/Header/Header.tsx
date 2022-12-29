import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../hooks/useAuth';
import { AuthButtons } from '../UI/AuthButtons';
import { ProfileButton } from '../UI/ProfileButton';
import { BurgerMenu } from '../UI/BurgerMenu';

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
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: isAuth ? 'space-between' : 'center',
            alignItems: isAuth ? 'center' : 'end',
          }}
        >
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
