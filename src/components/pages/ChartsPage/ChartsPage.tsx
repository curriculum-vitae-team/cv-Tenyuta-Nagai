import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { DepartmentsChart } from './DepartmentsChart';
import { PositionsChart } from './PositionsChart';
import { RegistrationChart } from './RegistrationChart';

const ChartsPage = () => {
  return (
    <main>
      <Container maxWidth="xl">
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
          <DepartmentsChart />
          <PositionsChart />
          <RegistrationChart />
        </Grid>
      </Container>
    </main>
  );
};

export default ChartsPage;
