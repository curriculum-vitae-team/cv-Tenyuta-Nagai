import React, { useState } from 'react';
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RoutePath } from '../../constants/routeVariables';
import { schema } from '../../utils/validationSchema';
import {
  ButtonSubmitForm,
  GridContainer,
  PaperContainer,
  FormSign,
  ValidationError,
} from '../SignUpPage/SignUp.styles';
import { IFormInput } from '../../interfaces/input/IFormInput.interface';

const LogInPage = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => console.log(data);

  const handleVisiblePassword = () => {
    setHiddenPassword((visability) => !visability);
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
            Welcome back!
          </Typography>
          <Typography sx={{ fontFamily: 'Segoe UI' }}>Hello again! Sign in to continue</Typography>
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
              Sign in
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
              to={`/${RoutePath.SIGNUP}`}
            >
              I don`t have an account
            </Button>
          </FormSign>
        </Grid>
      </PaperContainer>
    </GridContainer>
  );
};

export default LogInPage;
