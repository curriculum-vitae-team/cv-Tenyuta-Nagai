import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { DEPARTMENTS } from '../../../../graphql/queries/departments';
import { createArrayForDepartments } from '../../../../utils/createArrayForDepartments';
import { RoutePath } from '../../../../constants/routeVariables';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { Spinner } from '../../../Spinner';
import { IUser } from '../../../../interfaces/IUser.interface';
import { getQuantity } from '../helpers/getQuantity';
import { departmentsBackgrounds } from '../helpers/departmentsBackgrounds';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DepartmentsChart = () => {
  const navigate = useNavigate();

  const { data: departmentsData, loading: departmentsLoading } = useQuery(DEPARTMENTS, {
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });

  const users = usersData?.users.map((elem: IUser) => elem.department_name);
  const departments = createArrayForDepartments(departmentsData?.departments);
  const employeesNumbers = getQuantity(departments, users);

  const dataPie = {
    labels: departments,
    datasets: [
      {
        label: 'Number of employees',
        data: employeesNumbers,
        backgroundColor: departmentsBackgrounds,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      {departmentsLoading || usersLoading ? (
        <Spinner />
      ) : (
        <>
          <Typography sx={{ fontSize: '20px' }}>
            Number of employees in different departments
          </Typography>
          <Box>
            <Pie data={dataPie} />
          </Box>
        </>
      )}
    </Box>
  );
};
