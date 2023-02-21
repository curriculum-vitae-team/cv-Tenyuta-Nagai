import { Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../constants/routeVariables';
import { schema } from '../../../utils/validationSchema';
import { authService } from '../../../graphql/service/authentication/authService';
import { ISignupResult } from '../../../graphql/service/authentication/authResult.interface.';
import { SIGNUP } from '../../../graphql/mutations/auth';
import { IFormInput } from './formInput.interface';
import {
  ButtonLink,
  ButtonSubmitForm,
  FormSign,
  GridContainer,
  LoadingBtn,
  Main,
  PaperContainer,
} from './SignUp.styles';

const SignUpPage = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [signUp, { loading }] = useMutation<ISignupResult>(SIGNUP);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const handleVisiblePassword = () => {
    setHiddenPassword((visibility) => !visibility);
  };

  const onSubmit = async (input: IFormInput) => {
    const { data } = await signUp({ variables: input });
    if (data) {
      authService.writeUserToStorage(data.signup.user, data.signup.access_token);
      navigate(`/${RoutePath.EMPLOYEES}`);
    }
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
                {t('Register now')}
              </Typography>
              <Typography>{t('Welcome! Sign up to continue')}</Typography>
              <FormSign onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  fullWidth
                  label={t('Email')}
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
                  label={t('Password')}
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
                    {t('Sign up')}
                  </ButtonSubmitForm>
                )}

                <ButtonLink
                  fullWidth
                  type="submit"
                  variant="text"
                  component={NavLink}
                  to={`/${RoutePath.LOGIN}`}
                >
                  {t('I have an account')}
                </ButtonLink>
              </FormSign>
            </Grid>
          </PaperContainer>
        </GridContainer>
      </Container>
    </Main>
  );
};

export default SignUpPage;
