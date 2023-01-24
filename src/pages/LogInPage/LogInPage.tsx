import React, { useState } from 'react';
import { Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import { RoutePath } from '../../constants/routeVariables';
import { schema } from '../../utils/validationSchema';
import {
  ButtonSubmitForm,
  GridContainer,
  PaperContainer,
  FormSign,
  Main,
  ButtonLink,
  LoadingBtn,
} from '../SignUpPage/SignUp.styles';
import { authService } from '../../graphql/authentication/authService';
import { ILoginResult } from '../../graphql/authentication/authResult.interface.';
import { LOGIN } from '../../graphql/queries/auth';
import { IFormInput } from './../SignUpPage/formInput.interface';

const LogInPage = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [login, { loading }] = useLazyQuery<ILoginResult>(LOGIN);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (input: IFormInput) => {
    const { data } = await login({ variables: input });
    if (data) {
      authService.writeUserToStorage(data.login.user, data.login.access_token);
      navigate(`/${RoutePath.EMPLOYEES}`);
    }
  };

  const handleVisiblePassword = () => {
    setHiddenPassword((visibility) => !visibility);
  };

  return (
    <Main>
      <Container maxWidth="xl" sx={{ height: '100%', pb: 2 }}>
        <GridContainer container>
          <PaperContainer>
            <Grid
              container
              direction="column"
              sx={{ p: 3, alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography sx={{ mb: 1 }} variant="h4">
                Welcome back!
              </Typography>
              <Typography>Hello again! Sign in to continue</Typography>
              <FormSign onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter email"
                  variant="outlined"
                  sx={{ mt: 2, mb: 0.5 }}
                  color="secondary"
                  type="email"
                  {...register('email')}
                  helperText={errors.email?.message}
                  error={!!errors.email?.message}
                />

                <TextField
                  fullWidth
                  sx={{ mt: 2, mb: 0.5 }}
                  label="Password"
                  placeholder="Enter password"
                  color="secondary"
                  variant="outlined"
                  type={hiddenPassword ? 'password' : 'text'}
                  {...register('password')}
                  helperText={errors.password?.message}
                  error={!!errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ cursor: 'pointer' }}
                        onClick={handleVisiblePassword}
                      >
                        {hiddenPassword ? <Visibility /> : <VisibilityOff />}
                      </InputAdornment>
                    ),
                  }}
                />

                {loading ? (
                  <LoadingBtn fullWidth loading variant="contained" />
                ) : (
                  <ButtonSubmitForm fullWidth type="submit" variant="contained">
                    Sign in
                  </ButtonSubmitForm>
                )}

                <ButtonLink
                  fullWidth
                  type="submit"
                  variant="text"
                  component={NavLink}
                  to={`/${RoutePath.SIGNUP}`}
                >
                  I don`t have an account
                </ButtonLink>
              </FormSign>
            </Grid>
          </PaperContainer>
        </GridContainer>
      </Container>
    </Main>
  );
};

export default LogInPage;
