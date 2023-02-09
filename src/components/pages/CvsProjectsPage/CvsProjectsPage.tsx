import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { CV } from '../../../graphql/queries/cv';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { cvsProjectsHeaderTable } from './data/cvsProjectsHeaderTable';
import { createCvsProjectRowData } from './helpers/createCvsProjectRowData';
import { UpdateModal } from './UpdateModal/UpdateModal';

const CvsProjectsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const Table = createTable();
  const { loading, data } = useQuery<ICvQueryResult>(CV, {
    variables: { id },
    onError() {
      navigate(`/${RoutePath.CVS}`, { replace: true });
    },
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container>
          <Table
            header={cvsProjectsHeaderTable}
            items={createCvsProjectRowData(data?.cv?.projects || [])}
            searchParameter="projectName"
            titleCreateBtn="Update"
            isCreateBtnVisible={data?.cv.user?.id === user?.id || isAdmin}
            ModalForCreating={UpdateModal}
            defaultSortingBy="projectName"
          />
        </Grid>
      )}
    </>
  );
};

export default CvsProjectsPage;
