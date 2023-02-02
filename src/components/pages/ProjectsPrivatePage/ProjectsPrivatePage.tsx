import React from 'react';
import { Outlet } from 'react-router-dom';
import * as Styled from './ProjectsPrivatePage.styles';

const ProjectsPrivatePage = () => {
  return (
    <main>
      <Styled.ContainerWrapper maxWidth="xl">
        <Outlet />
      </Styled.ContainerWrapper>
    </main>
  );
};

export default ProjectsPrivatePage;
