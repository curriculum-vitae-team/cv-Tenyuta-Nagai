import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { SKILLS } from '../../../graphql/queries/skills';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { SkillCreateModal } from './SkillCreate/SkillCreateModal';
import { SkillsTableHeader } from './TableData/SkillsTableHeader';
import { getAllSkills } from './TableData/SkillsTableRows';

const SkillsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(SKILLS);
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [skill, setSkill] = useState({
    name: '',
    id: '',
  });

  useEffect(() => {
    if (error) {
      navigate(`/${RoutePath.LOGIN}`, { replace: true });
    }
  });

  const handleUpdateSkill = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
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
          />
        </Grid>
      </Container>
    </main>
  );
};

export default SkillsPage;
