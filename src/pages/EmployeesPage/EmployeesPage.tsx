import { Container, Grid } from '@mui/material';
import React from 'react';
import { createTable } from '../../components/Table/template/templateTable';
import { UsersTableHeader } from './Table/Header';

const EmployeesPage = () => {
  const Table = createTable();

  return (
    <main style={{ marginRight: '40px', marginLeft: '40px' }}>
      <Grid container sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <Table TableHeaderComponent={UsersTableHeader} />
      </Grid>
    </main>
  );
};

export default EmployeesPage;
