import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { GET_ALL_PROJECTS } from '../../../graphql/queries/projects';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { ProjectsTableHeader } from './TableData/ProjectsTableHeader';
import { getProjects } from './TableData/ProjectsTableRows';
import { ProjectsAdditionalButtons } from './ProjectsAdditionalButtons/ProjectsAdditionalButtons';
import { ProjectCreateModal } from './ProjectsCreateModal';

const ProjectsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS);
  const user = useUser();
  const isCreateBtnVisible = user?.role === UserRoles.Admin;

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
            header={ProjectsTableHeader}
            items={getProjects(data.projects)}
            ModalForCreating={ProjectCreateModal}
            searchParameter="name"
            titleCreateBtn="Add project"
            isCreateBtnVisible={isCreateBtnVisible}
            AdditionalButtons={ProjectsAdditionalButtons}
            defaultSortingBy="name"
          />
        </Grid>
      </Container>
    </main>
  );
};

export default ProjectsPage;
