import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTable } from '../../components/Table/template/templateTable';
import { GET_ALL_USERS } from '../../graphql/queries/users';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import { useUser } from '../../hooks/useUser';
import { UserRoles } from '../../constants/userRoles';
import { UsersTableHeader } from './TableData/UsersTableHeader';
import { getAllUsers } from './TableData/UsersTableRows';
import { EmployeesModal } from './EmployeesModal';
import { EmployeesAdditionalButtons } from './EmployeesAdditionalButtons/EmployeesAdditionalButtons';

const EmployeesPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const user = useUser();
  const isCreateBtnVisible = user?.role === UserRoles.Admin;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.LOGIN}`, { replace: true });
  }

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          <Table
            header={UsersTableHeader}
            items={getAllUsers(data?.users || [])}
            ModalForCreating={EmployeesModal}
            searchParameter="name"
            titleCreateBtn="Add employee"
            isCreateBtnVisible={isCreateBtnVisible}
            AdditionalButtons={EmployeesAdditionalButtons}
          />
        </Grid>
      </Container>
    </main>
  );
};

export default EmployeesPage;
