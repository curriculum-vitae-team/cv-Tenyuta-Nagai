import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DepartmentsChart } from './DepartmentsChart/DepartmentsChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsPage = () => {
  return (
    <main>
      <Container maxWidth="xl">
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <DepartmentsChart />
        </Grid>
      </Container>
    </main>
  );
};

export default ChartsPage;
