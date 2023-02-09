import { Box, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthButtons } from '../UI/AuthButtons';
import { ProfileButton } from '../UI/ProfileButton';
import { BurgerMenu } from '../UI/BurgerMenu';
import { LanguageButton } from '../UI/LanguageButton';
import { NavBreadcrumbs } from '../UI/NavBreadcrumbs';
import { useAuth } from '../../hooks/useAuth';
import { ToolbarHeader, WrapAuthBtnHeader } from './header.styles';

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
    <>
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
                <WrapAuthBtnHeader>
                  <ProfileButton />
                  <LanguageButton />
                </WrapAuthBtnHeader>
                <BurgerMenu open={isOpenMenu} onClose={handleCloseMenu} />
              </>
            ) : (
              <>
                <Box sx={{ width: 34 }}></Box>
                <AuthButtons />
                <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
                  <LanguageButton />
                </Box>
              </>
            )}
          </ToolbarHeader>
        </Container>
      </AppBar>

      {isAuth && (
        <Container maxWidth="xl">
          <NavBreadcrumbs />
        </Container>
      )}
    </>
  );
};
