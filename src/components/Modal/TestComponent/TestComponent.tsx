import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { modalService } from '../../../graphql/service/modalService';
import { ITestComponentProps } from './TestComponent.types';

export const TestComponent = () => {
  const modalProps: Pick<Partial<ITestComponentProps>, keyof ITestComponentProps> = useReactiveVar(
    modalService.modalData$
  );

  return <>{<div>{modalProps?.user?.profile?.id}</div>}</>;
};