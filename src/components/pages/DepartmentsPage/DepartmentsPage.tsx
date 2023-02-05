import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { DEPARTMENTS } from '../../../graphql/queries/departments';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { EmployeesModal } from '../EmployeesPage/EmployeesModal';
import { DepartmentsAdditionalButtons } from './DepartmentsAdditionalBtns/DepartmentsAdditionalBtns';
import { getAllDepartments } from './TableData/DepartmentsRows';
import { DepartmentsTableHeader } from './TableData/DepartmentsTableHeader';

const DepartmentsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(DEPARTMENTS);
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
            header={DepartmentsTableHeader}
            items={getAllDepartments(data?.departments || [])}
            ModalForCreating={EmployeesModal}
            searchParameter="name"
            titleCreateBtn="Add employee"
            isCreateBtnVisible={isCreateBtnVisible}
            AdditionalButtons={DepartmentsAdditionalButtons}
            defaultSortingBy="name"
          />
        </Grid>
      </Container>
    </main>
  );
};

export default DepartmentsPage;
