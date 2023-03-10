import React, { FC } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Container, Grid, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { RoutePath } from '../../../constants/routeVariables';
import { ErrorPageButton, Image, ReloadButton, TypographyStyled } from './ErrorPage.styles';
import { IPropsPageNotFound } from './ErrorPage.interface';

const ErrorPage: FC<IPropsPageNotFound> = ({ pageNotFound }) => {
  const isAuth = useAuth();
  const { t } = useTranslation();

  const onHandleReload = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <main>
      <Container sx={{ mt: '85px' }}>
        <TypographyStyled>
          {pageNotFound ? t('Page not found..') : t('Something went wrong..')}
        </TypographyStyled>

        <Grid container justifyContent="center">
          <Grid item xs={5}>
            {pageNotFound ? (
              <Image src="./404.png" alt="Error image" />
            ) : (
              <Image src="./errorimage.png" alt="Error image" />
            )}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" gap={2} mt="40px">
          {!pageNotFound && (
            <Grid item>
              <ErrorPageButton
                size="large"
                variant="contained"
                component={Link}
                href={isAuth ? RoutePath.EMPLOYEES : RoutePath.LOGIN}
              >
                {isAuth ? t('Main page') : t('Login page')}
              </ErrorPageButton>
            </Grid>
          )}

          <Grid item>
            <ReloadButton size="large" variant="contained" onClick={onHandleReload}>
              <RefreshIcon />
            </ReloadButton>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
export default ErrorPage;
