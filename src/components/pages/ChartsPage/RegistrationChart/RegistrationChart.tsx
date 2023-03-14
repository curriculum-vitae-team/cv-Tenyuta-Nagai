import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { RoutePath } from '../../../../constants/routeVariables';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { Spinner } from '../../../Spinner';
import { getArrayOfCurrentMonths } from '../helpers/getMonthsArray';
import { IUser } from '../../../../interfaces/IUser.interface';
import * as Styled from './../ChartsPage.styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const RegistrationChart = () => {
  const navigate = useNavigate();
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });

  const options = {
    responsive: true,
  };

  const labels = getArrayOfCurrentMonths();
  const usersRegistrationDate = () => {
    const lastYear = Number(new Date()) - 31536000000;
    const users: string[] = [];
    usersData?.users.map((item: IUser) => {
      console.log(Number(item.created_at));
      if (Number(item.created_at) < lastYear) {
        return;
      }
      users.push(dayjs(item.created_at).format('MMMM'));
    });
    return users;
  };

  console.log(usersRegistrationDate());

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of employees',
        data: labels.map(() => Math.random()),
        borderColor: 'rgba(198, 48, 49, 1)',
        backgroundColor: 'rgba(198, 48, 49, 0.8)',
      },
    ],
  };

  return usersLoading ? (
    <Spinner />
  ) : (
    <Styled.PaperWrapper>
      <Styled.PaperTypography sx={{ fontSize: '20px' }}>
        Account creation timeline for the last year
      </Styled.PaperTypography>
      <Styled.BarChartWrapper>
        <Line options={options} data={data} />
      </Styled.BarChartWrapper>
    </Styled.PaperWrapper>
  );
};
