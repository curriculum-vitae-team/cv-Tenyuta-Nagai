import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { DEPARTMENTS } from '../../../graphql/queries/departments';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { DepartmentsCreateModal } from './DepartmentCreate';
import { DepartmentsAdditionalButtons } from './DepartmentsAdditionalBtns/DepartmentsAdditionalBtns';
import { DepartmentUpdateModal } from './DepartmentUpdate';
import { getAllDepartments } from './TableData/DepartmentsRows';
import { DepartmentsTableHeader } from './TableData/DepartmentsTableHeader';

const DepartmentsPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(DEPARTMENTS);
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [department, setDepartment] = useState({
    name: '',
    id: '',
  });

  useEffect(() => {
    if (error) {
      navigate(`/${RoutePath.LOGIN}`, { replace: true });
    }
  });

  const handleUpdateDepartment = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

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
            ModalForCreating={DepartmentsCreateModal}
            searchParameter="name"
            titleCreateBtn="Create"
            isCreateBtnVisible={isAdmin}
            AdditionalButtons={isAdmin ? DepartmentsAdditionalButtons : undefined}
            defaultSortingBy="name"
            handleUpdate={handleUpdateDepartment}
            setItem={setDepartment}
          />
        </Grid>
      </Container>
      {isOpenModal && (
        <DepartmentUpdateModal
          open={isOpenModal}
          onClose={handleCloseModal}
          department={department}
        />
      )}
    </main>
  );
};

export default DepartmentsPage;
