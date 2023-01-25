import { useQuery } from '@apollo/client';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import { UserRoles } from '../../constants/userRoles';
import { USER } from '../../graphql/queries/user';
import { useUser } from '../../hooks/useUser';
import { IUserAllResult } from '../../interfaces/IUser.interface';
import { CvsMenu } from './CvsMenu/CvsMenu';
import { ICvData } from './EmployeesCVsPage.types';

const EmployeesCVsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const currentId = user?.role === UserRoles.Admin ? id : user?.id;
  const { loading, error, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
  });
  const navigate = useNavigate();
  const [cvData, setCvData] = useState<ICvData>({
    name: '',
    description: '',
  });
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  if (error) {
    navigate(`/${RoutePath.EMPLOYEES}`);
  }

  if (data) {
    console.log(data);
  }

  const showCvData = (id: string) => {
    const cv = data?.user.cvs?.filter((x) => x.id === id)[0];
    if (cv) {
      setCvData({ name: cv.name, description: cv.description });
    }
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          minWidth: '100%',
          minHeight: 300,
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" onClick={handleOpenMenu}>
                Cvs list
              </Button>
            </Box>

            <Divider />
            <Box>
              <Box>{'Name:'}</Box>
              <Box>{cvData.name}</Box>
              <Box>{'Description:'}</Box>
              <Box>{cvData.description}</Box>
            </Box>
          </Container>
        )}
      </Paper>
      <CvsMenu data={data!} open={isOpenMenu} showCvData={showCvData} onClose={handleCloseMenu} />
    </>
  );
};

// const EmployeesCVsPage = () => {
//   const user = useUser();
//   const { id } = useParams();
//   const currentId = user?.role === UserRoles.Admin ? id : user?.id;
//   const { loading, error, data } = useQuery<IUserAllResult>(USER, {
//     variables: { id: currentId },
//   });
//   const navigate = useNavigate();

//   const [isOpenCvModal, setIsOpenCvModal] = useState(false);

//   const handleOpenCvModal = () => {
//     setIsOpenCvModal(true);
//   };

//   const handleCloseCvModal = () => {
//     setIsOpenCvModal(false);
//   };

//   if (error) {
//     navigate(`/${RoutePath.EMPLOYEES}`);
//   }

//   if (data) {
//     console.log(data);
//   }

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <Box>
//             <Button variant="contained" onClick={handleOpenCvModal}>
//               Create Cv
//             </Button>
//           </Box>

//           {isOpenCvModal && (
//             <CvModal userData={data!} open={isOpenCvModal} onClose={handleCloseCvModal} />
//           )}
//         </>
//       )}
//     </>
//   );
// };

export default EmployeesCVsPage;
