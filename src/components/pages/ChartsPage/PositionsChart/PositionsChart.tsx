import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../../constants/routeVariables';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { Spinner } from '../../../Spinner';
import { IUser } from '../../../../interfaces/IUser.interface';
import { IPositionReturn } from '../../../../graphql/types/results/position';
import { POSITIONS } from '../../../../graphql/queries/positions';
import { createArrayForPositions } from '../../../../utils/createArrayForPositions';
import { getPositionsQuantity } from '../helpers/getPositionsQuantity';
import * as Styled from './../ChartsPage.styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PositionsChart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: positionsData, loading: positionsLoading } = useQuery<IPositionReturn>(POSITIONS, {
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });
  const users = usersData?.users.map((item: IUser) => item.position_name);
  const labels = ['Without position', ...createArrayForPositions(positionsData?.positions)];
  const employeesNumbers = getPositionsQuantity(labels, users);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 110.5,
      },
    },
  };

  const dataBar = {
    labels,
    datasets: [
      {
        label: t('Number of employees'),
        data: labels.map((value, index) => employeesNumbers[index]),
        borderColor: 'rgba(198, 48, 49, 1)',
        borderWidth: 2,
        backgroundColor: 'rgba(198, 48, 49, 0.6)',
      },
    ],
  };

  return positionsLoading || usersLoading ? (
    <Spinner />
  ) : (
    <Styled.PaperWrapper>
      <Styled.PaperTypography>{t('Distribution of employees by position')}</Styled.PaperTypography>
      <Styled.BarChartWrapper>
        <Bar options={options} data={dataBar} />
      </Styled.BarChartWrapper>
    </Styled.PaperWrapper>
  );
};
