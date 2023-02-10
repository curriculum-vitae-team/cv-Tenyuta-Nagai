import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { SKILLS } from '../../../graphql/queries/skills';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { SkillCreateModal } from './SkillCreate';
import { SkillsAdditionalButtons } from './SkillsAdditionalBtns/SkillsAdditionalBtns';
import { SkillsTableHeader } from './TableData/SkillsTableHeader';
import { getAllSkills } from './TableData/SkillsTableRows';

const SkillsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading } = useQuery(SKILLS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <Container maxWidth="xl">
          <Grid container>
            <Table
              header={SkillsTableHeader}
              items={getAllSkills(data?.skills || [])}
              ModalForCreating={SkillCreateModal}
              searchParameter="name"
              titleCreateBtn="Create skill"
              isCreateBtnVisible={isAdmin}
              defaultSortingBy="name"
              AdditionalButtons={isAdmin ? SkillsAdditionalButtons : undefined}
              titleModal={'Create skill'}
            />
          </Grid>
        </Container>
      )}
    </main>
  );
};

export default SkillsPage;
