import { Tabs } from '@mui/material';
import React, { FC } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { INavButtonsPrivatePageProps } from './NavButtonsPrivatePage.types';
import * as Styled from './NavButtonsPrivatePage.styles';

export const NavButtonsPrivatePage: FC<INavButtonsPrivatePageProps> = ({ data, startPath }) => {
  const location = useLocation();
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <Styled.Wrapper>
      <Tabs
        value={location.pathname}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {data.map(({ value }) => (
          <Styled.TabNav
            key={value}
            value={`/${startPath}/${id}/${value}`}
            component={NavLink}
            label={t(value)}
            to={value}
          />
        ))}
      </Tabs>
    </Styled.Wrapper>
  );
};
