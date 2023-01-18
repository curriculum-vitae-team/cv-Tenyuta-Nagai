import { Container, Grid } from '@mui/material';
import React from 'react';
import { createTable } from '../../components/Table/template/templateTable';
import { UsersTableHeader } from './Table/Header';

const EmployeesPage = () => {
  const Table = createTable();

  return (
    <main>
      <Grid container sx={{ maxWidth: '1300px', margin: 'auto' }}>
        <Table TableHeadComponent={UsersTableHeader} />
      </Grid>
    </main>
  );
};

export default EmployeesPage;
