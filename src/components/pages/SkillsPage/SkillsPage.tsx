import { useReactiveVar } from '@apollo/client';
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { modalService } from '../../../graphql/service/modalService';
import { testData } from '../../Modal/data/testData';
import { TestComponent } from '../../Modal/TestComponent/TestComponent';

const SkillsPage = () => {
  const open = () => {
    modalService.setProps(testData);
    modalService.setComponent(TestComponent);
    modalService.openModal();
  };

  return (
    <main>
      <Button onClick={open}>open</Button>
    </main>
  );
};

export default SkillsPage;
