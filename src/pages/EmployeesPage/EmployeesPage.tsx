import { Container, Grid } from '@mui/material';
import React from 'react';
import { createTable } from '../../components/Table/template/templateTable';
import { UsersTableHeader } from './TableData/UsersTableHeader';

const EmployeesPage = () => {
  const Table = createTable();

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          <Table header={UsersTableHeader} />
        </Grid>
      </Container>
    </main>
  );
};

export default EmployeesPage;
