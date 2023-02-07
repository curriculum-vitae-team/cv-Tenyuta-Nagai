import React from 'react';
import { Spinner } from '../../Spinner';
import { ITestComponentProps } from './TestComponent.types';

export const TestComponent = (props: ITestComponentProps) => {
  console.log(22222);
  return <>{<div>{props?.name}</div>}</>;
};
