import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { data, loading } = useQuery(GET_ALL_PROJECTS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });
  const user = useUser();
  const isCreateBtnVisible = user?.role === UserRoles.Admin;
  const { t } = useTranslation();

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <Container maxWidth="xl">
          <Grid container>
            <Table
              header={ProjectsTableHeader}
              items={getProjects(data.projects)}
              ModalForCreating={ProjectCreateModal}
              titleModal={t('Create new project')}
              searchParameter="name"
              titleCreateBtn={t('Add project')}
              isCreateBtnVisible={isCreateBtnVisible}
              AdditionalButtons={ProjectsAdditionalButtons}
              defaultSortingBy="name"
            />
          </Grid>
        </Container>
      )}
    </main>
  );
};

export default ProjectsPage;
