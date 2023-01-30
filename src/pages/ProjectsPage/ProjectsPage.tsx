import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTable } from '../../components/Table/template/templateTable';

import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import { GET_ALL_PROJECTS } from '../../graphql/queries/projects';
import { useUser } from '../../hooks/useUser';
import { UserRoles } from '../../constants/userRoles';
import { EmployeesModal } from '../EmployeesPage/EmployeesModal';
import { ProjectsTableHeader } from './TableData/ProjectsTableHeader';
import { getProjects } from './TableData/ProjectsTableRows';
import { ProjectsAdditionalButtons } from './ProjectsAdditionalButtons/ProjectsAdditionalButtons';

const ProjectsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS);
  const user = useUser();
  const isCreateBtnVisible = user?.role === UserRoles.Admin;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.LOGIN}`, { replace: true });
  }

  console.log(data.projects);

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          <Table
            header={ProjectsTableHeader}
            items={getProjects(data.projects)}
            ModalForCreating={EmployeesModal}
            searchParameter="name"
            titleCreateBtn="Add project"
            isCreateBtnVisible={isCreateBtnVisible}
            AdditionalButtons={ProjectsAdditionalButtons}
          />
        </Grid>
      </Container>
    </main>
  );
};

export default ProjectsPage;
