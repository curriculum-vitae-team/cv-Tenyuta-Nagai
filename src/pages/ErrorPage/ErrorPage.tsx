import React, { FC } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Container, Grid, Typography, Link } from '@mui/material';
import { RoutePath } from '../../constants/routeVariables';
import { ErrorPageButton, ReloadButton } from './ErrorPage.styles';
import { IPropsPageNotFound } from './ErrorPage.interface';

const ErrorPage: FC<IPropsPageNotFound> = ({ pageNotFound }) => {
  return (
    <main>
      <Container sx={{ mt: '85px' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            mb: '26px',
          }}
        >
          {pageNotFound ? 'Page not found..' : 'Something went wrong..'}
        </Typography>

        <Grid container justifyContent="center">
          {pageNotFound ? (
            <img style={{ display: 'block', width: '500px' }} src="./404.png" alt="Error image" />
          ) : (
            <img
              style={{ display: 'block', width: '500px' }}
              src="./errorimage.png"
              alt="Error image"
            />
          )}
        </Grid>

        <Grid container justifyContent="center" columnGap={2} mt="40px">
          {pageNotFound ? (
            ''
          ) : (
            <Grid item>
              <ErrorPageButton
                size="large"
                variant="contained"
                component={Link}
                href={RoutePath.LOGIN}
              >
                Login page
              </ErrorPageButton>
            </Grid>
          )}

          <Grid item>
            <ReloadButton
              size="large"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              <RefreshIcon />
            </ReloadButton>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
export default ErrorPage;
