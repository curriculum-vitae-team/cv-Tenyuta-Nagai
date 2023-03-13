import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DepartmentsChart } from './DepartmentsChart';
import { PositionsChart } from './PositionsChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsPage = () => {
  return (
    <main>
      <Container maxWidth="xl">
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
          <DepartmentsChart />
          <PositionsChart />
        </Grid>
      </Container>
    </main>
  );
};

export default ChartsPage;
