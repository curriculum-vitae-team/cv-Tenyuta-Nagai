/* eslint-disable prettier/prettier */
import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTable } from '../../components/Table/template/templateTable';

import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import { GET_ALL_PROJECTS } from '../../graphql/queries/projects';
import { ProjectsTableHeader } from './TableData/ProjectsTableHeader';
import { getProjects } from './TableData/ProjectsTableRows';

const ProjectsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS);

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
          {/* <Table
            header={ProjectsTableHeader}
            items={getProjects(data.projects)}
            searchParameter="name" 
          /> */}
        </Grid>
      </Container>
    </main>
  );
};

export default ProjectsPage;
