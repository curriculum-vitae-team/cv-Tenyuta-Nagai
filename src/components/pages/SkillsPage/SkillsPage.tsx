import { Button } from '@mui/material';
import React from 'react';
import { modalService } from '../../../graphql/service/modalService';
import { testData } from '../../Modal/data/testData';
import { TestComponent } from '../../Modal/TestComponent/TestComponent';

const SkillsPage = () => {
  const open = () => {
    modalService.setModalData('test', testData, TestComponent);
  };

  return (
    <main>
      <Button onClick={open}>open</Button>
    </main>
  );
};

export default SkillsPage;
