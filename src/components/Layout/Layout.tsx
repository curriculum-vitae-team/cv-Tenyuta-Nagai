import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { Header } from '../Header';
import { Spinner } from '../Spinner';
import { ErrorBoundary } from '../ErrorBoundary';
import { Notifier } from '../UI/Notifier';
import { modalService } from '../../graphql/service/modalService';
import { ModalWindow } from '../UI/ModalWindow';

export const Layout = () => {
  const isOpen = useReactiveVar(modalService.open$);

  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <Notifier />
      {isOpen && <ModalWindow />}
    </>
  );
};
