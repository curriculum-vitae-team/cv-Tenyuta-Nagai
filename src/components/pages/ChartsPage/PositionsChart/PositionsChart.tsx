import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../constants/routeVariables';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { Spinner } from '../../../Spinner';
import { IUser } from '../../../../interfaces/IUser.interface';
import { departmentsBackgrounds, departmentsBorders } from '../helpers/departmentsBackgrounds';
import { IPositionReturn } from '../../../../graphql/types/results/position';
import { POSITIONS } from '../../../../graphql/queries/positions';
import { createArrayForPositions } from '../../../../utils/createArrayForPositions';
import { getPositionsQuantity } from '../helpers/getPositionsQuantity';
import * as Styled from './../ChartsPage.styles';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PositionsChart = () => {
  const navigate = useNavigate();

  const { data: positionsData, loading: positionsLoading } = useQuery<IPositionReturn>(POSITIONS, {
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });

  const users = usersData?.users.map((elem: IUser) => elem.position_name);
  const positions = ['Without position', ...createArrayForPositions(positionsData?.positions)];
  const employeesNumbers = getPositionsQuantity(positions, users);

  const dataPie = {
    labels: positions,
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
  return (
    <Styled.PaperWrapper>
      {positionsLoading || usersLoading ? (
        <Spinner />
      ) : (
        <>
          <Styled.PaperTypography sx={{ fontSize: '20px' }}>
            Distribution of employees by position
          </Styled.PaperTypography>
          <Styled.ChartWrapper>
            <Pie data={dataPie} />
          </Styled.ChartWrapper>
        </>
      )}
    </Styled.PaperWrapper>
  );
};
