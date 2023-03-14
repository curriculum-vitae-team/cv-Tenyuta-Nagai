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
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../../constants/routeVariables';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { Spinner } from '../../../Spinner';
import { getArrayOfCurrentMonths } from '../helpers/getMonthsArray';
import { getUsersRegistrationDates } from '../helpers/getUsersRegistrationDates';
import { getMonthsQuantity } from '../helpers/getMonthsQuantity';
import * as Styled from './../ChartsPage.styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const RegistrationChart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });
  const labels = getArrayOfCurrentMonths();
  const usersRegistrationMonths = getUsersRegistrationDates(usersData?.users);
  const quantityData = getMonthsQuantity(labels, usersRegistrationMonths);

  const options = {
    responsive: true,
  };

  const data = {
    labels,
    datasets: [
      {
        label: t('Number of employees'),
        data: labels.map((value, index) => quantityData[index]),
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
        {t('Account creation timeline for the last year')}
      </Styled.PaperTypography>
      <Styled.LineChartWrapper>
        <Line options={options} data={data} />
      </Styled.LineChartWrapper>
    </Styled.PaperWrapper>
  );
};
