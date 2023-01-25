import { useQuery } from '@apollo/client';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import { UserRoles } from '../../constants/userRoles';
import { USER } from '../../graphql/queries/user';
import { useUser } from '../../hooks/useUser';
import { IUserAllResult } from '../../interfaces/IUser.interface';
import { CvModal } from './CvModal/CvModal';

const EmployeesCVsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const currentId = user?.role === UserRoles.Admin ? id : user?.id;
  const { loading, error, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
  });
  const navigate = useNavigate();

  const [isOpenCvModal, setIsOpenCvModal] = useState(false);

  const handleOpenCvModal = () => {
    setIsOpenCvModal(true);
  };

  const handleCloseCvModal = () => {
    setIsOpenCvModal(false);
  };

  if (error) {
    navigate(`/${RoutePath.EMPLOYEES}`);
  }

  if (data) {
    console.log(data);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box>
            <Button variant="contained" onClick={handleOpenCvModal}>
              Create Cv
            </Button>
          </Box>

          {isOpenCvModal && <CvModal open={isOpenCvModal} onClose={handleCloseCvModal} />}
        </>
      )}
    </>
  );
};

export default EmployeesCVsPage;
