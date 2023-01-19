import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { createTable } from '../../components/Table/template/templateTable';
import { GET_ALL_USERS } from '../../graphql/queries/users';
import { Spinner } from '../../components/Spinner';
import { UsersTableHeader } from './TableData/UsersTableHeader';
import { getAllUsers } from './TableData/UsersTableRows';

const EmployeesPage = () => {
  const Table = createTable();
  const { data, loading } = useQuery(GET_ALL_USERS);

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          {loading ? (
            <Spinner />
          ) : (
            <Table header={UsersTableHeader} items={getAllUsers(data?.users || [])} />
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default EmployeesPage;
