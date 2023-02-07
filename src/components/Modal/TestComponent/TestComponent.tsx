import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { modalService } from '../../../graphql/service/modalService';
import { ITestComponentProps } from './TestComponent.types';

export const TestComponent = () => {
  const modalProps = useReactiveVar(modalService.modalProps$) as ITestComponentProps;

  return (
    <>
      <div>{modalProps!.name}</div>
      <div>{modalProps!.name}</div>
      <div>{modalProps!.name}</div>
      <div>{modalProps!.name}</div>
    </>
  );
};
