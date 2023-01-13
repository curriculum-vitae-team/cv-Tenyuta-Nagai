import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { RoutePath } from '../../constants/routeVariables';
import { schema } from '../../utils/validationSchema';
import { IFormInput } from '../../interfaces/input/IFormInput.interface';
import { SIGNUP } from '../../graphql/authentication/mutation';
import { authService } from '../../graphql/authentication/authService';
import {
  ButtonSubmitForm,
  FormSign,
  GridContainer,
  PaperContainer,
  ValidationError,
} from './SignUp.styles';

const SignUpPage = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [signUp] = useMutation(SIGNUP);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const handleVisiblePassword = () => {
    setHiddenPassword((visability) => !visability);
  };

  const onSubmit = async (input: IFormInput) => {
    const { data } = await signUp({ variables: input });
    if (data) {
      const { user, access_token } = data.signup;
      authService.writeUserToStorage(user, access_token);
      navigate(`/${RoutePath.EMPLOYEES}`);
    }
  };

  return (
    <GridContainer>
      <PaperContainer>
        <Grid
          container
          direction="column"
          sx={{ p: 3, alignItems: 'center', justifyContent: 'center' }}
        >
          <Typography sx={{ fontFamily: 'Segoe UI', mb: 1 }} variant="h4">
            Register now
          </Typography>
          <Typography sx={{ fontFamily: 'Segoe UI' }}>Welcome! Sign up to continue</Typography>
          <FormSign onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter email"
              variant="outlined"
              sx={{ mt: 2, mb: 0.5 }}
              color="secondary"
              type="email"
              {...register('email')}
            />
            <ValidationError>{errors.email?.message}</ValidationError>

            <TextField
              fullWidth
              sx={{ mt: 2, mb: 0.5 }}
              label="Password"
              placeholder="Enter password"
              color="secondary"
              variant="outlined"
              type={hiddenPassword ? 'password' : 'text'}
              {...register('password')}
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
            <ValidationError>{errors.password?.message}</ValidationError>

            <ButtonSubmitForm fullWidth type="submit" variant="contained">
              Sign up
            </ButtonSubmitForm>

            <Button
              fullWidth
              sx={{
                height: '50px',
                mt: '16px',
                color: 'secondary.main',
              }}
              type="submit"
              variant="text"
              component={NavLink}
              to={`/${RoutePath.LOGIN}`}
            >
              I have an account
            </Button>
          </FormSign>
        </Grid>
      </PaperContainer>
    </GridContainer>
  );
};

export default SignUpPage;
