import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS } from '../../../../graphql/queries/departments';
import { createArrayForDepartments } from '../../../../utils/createArrayForDepartments';
import { RoutePath } from '../../../../constants/routeVariables';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { Spinner } from '../../../Spinner';
import { IUser } from '../../../../interfaces/IUser.interface';
import { departmentsBackgrounds, departmentsBorders } from '../helpers/departmentsBackgrounds';
import { getDepartmentsQuantity } from '../helpers/getDepartmentsQuantity';
import * as Styled from './../ChartsPage.styles';

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
  const departments = [
    'Without department',
    ...createArrayForDepartments(departmentsData?.departments),
  ];
  const employeesNumbers = getDepartmentsQuantity(departments, users);

  const dataPie = {
    labels: departments,
    datasets: [
      {
        label: 'Number of employees',
        data: employeesNumbers,
        backgroundColor: departmentsBackgrounds,
        borderColor: departmentsBorders,
        borderWidth: 1.5,
      },
    ],
  };
  //TO-DO TRANSLATE
  return departmentsLoading || usersLoading ? (
    <Spinner />
  ) : (
    <Styled.PaperWrapper>
      <Styled.PaperTypography sx={{ fontSize: '20px' }}>
        Number of employees in different departments
      </Styled.PaperTypography>
      <Styled.ChartWrapper>
        <Pie data={dataPie} />
      </Styled.ChartWrapper>
    </Styled.PaperWrapper>
  );
};
