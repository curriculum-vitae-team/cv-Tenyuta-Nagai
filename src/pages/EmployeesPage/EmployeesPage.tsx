import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTable } from '../../components/Table/template/templateTable';
import { GET_ALL_USERS } from '../../graphql/queries/users';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import {
  DeleteUserInput,
  DeleteUserResult,
} from '../../graphql/mutations/deleteUser/deleteUser.types';
import { DELETE_USER } from '../../graphql/mutations/deleteUser/deleteUser';
import { UsersTableHeader } from './TableData/UsersTableHeader';
import { getAllUsers } from './TableData/UsersTableRows';
import { IUsersResult } from './EmployeesPage.interface';

const EmployeesPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation<DeleteUserResult, DeleteUserInput>(DELETE_USER);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.LOGIN}`, { replace: true });
  }

  const handleUserDelete = (id: string) => {
    deleteUser({
      variables: { id },
      update(cache, { data }) {
        const allUsers = cache.readQuery<IUsersResult>({ query: GET_ALL_USERS });

        if (allUsers && data?.deleteUser.affected) {
          cache.writeQuery({
            query: GET_ALL_USERS,
            data: {
              users: allUsers.users.filter((user) => user?.id !== id),
            },
          });
        }
      },
    });
  };

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          <Table
            header={UsersTableHeader}
            items={getAllUsers(data?.users || [])}
            handleDelete={handleUserDelete}
            searchParameter="name"
          />
        </Grid>
      </Container>
    </main>
  );
};

export default EmployeesPage;
