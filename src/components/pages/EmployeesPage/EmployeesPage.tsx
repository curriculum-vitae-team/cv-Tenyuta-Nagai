import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTable } from '../../Table/template';
import { GET_ALL_USERS } from '../../../graphql/queries/users';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { Spinner } from '../../Spinner';
import { RoutePath } from '../../../constants/routeVariables';
import { UsersTableHeader } from './TableData/UsersTableHeader';
import { getAllUsers } from './TableData/UsersTableRows';
import { EmployeesModal } from './EmployeesModal';
import { EmployeesAdditionalButtons } from './EmployeesAdditionalButtons/EmployeesAdditionalButtons';

const EmployeesPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_ALL_USERS, {
    onError() {
      navigate(`/${RoutePath.LOGIN}`, { replace: true });
    },
  });
  const user = useUser();
  const isCreateBtnVisible = user?.role === UserRoles.Admin;

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <Container maxWidth="xl">
          <Grid container>
            <Table
              header={UsersTableHeader}
              items={getAllUsers(data?.users || [])}
              ModalForCreating={EmployeesModal}
              searchParameter="name"
              titleCreateBtn="Add employee"
              titleModal={'Create new user'}
              isCreateBtnVisible={isCreateBtnVisible}
              AdditionalButtons={EmployeesAdditionalButtons}
              defaultSortingBy="name"
            />
          </Grid>
        </Container>
      )}
    </main>
  );
};

export default EmployeesPage;
