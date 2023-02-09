import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { DEPARTMENTS } from '../../../graphql/queries/departments';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { DepartmentsCreateModal } from './DepartmentCreate';
import { DepartmentsAdditionalButtons } from './DepartmentsAdditionalBtns/DepartmentsAdditionalBtns';
import { getAllDepartments } from './TableData/DepartmentsRows';
import { DepartmentsTableHeader } from './TableData/DepartmentsTableHeader';

const DepartmentsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(DEPARTMENTS);
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;

  useEffect(() => {
    if (error) {
      navigate(`/${RoutePath.LOGIN}`, { replace: true });
    }
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          <Table
            header={DepartmentsTableHeader}
            items={getAllDepartments(data?.departments || [])}
            ModalForCreating={DepartmentsCreateModal}
            titleModal={'Create department'}
            searchParameter="name"
            titleCreateBtn="Create"
            isCreateBtnVisible={isAdmin}
            AdditionalButtons={isAdmin ? DepartmentsAdditionalButtons : undefined}
            defaultSortingBy="name"
          />
        </Grid>
      </Container>
    </main>
  );
};

export default DepartmentsPage;
