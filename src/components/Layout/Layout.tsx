import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Spinner } from '../Spinner';
import { ErrorBoundary } from '../ErrorBoundary';
import { Notifier } from '../UI/Notifier';
import { Modal } from '../Modal/Modal';
import { modalService } from '../../graphql/service/modalService';

export const Layout = () => {
  const isOpen = useReactiveVar(modalService.open$);

  return (
    <>
      <ErrorBoundary>
        <Header />

        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>

        <Footer />
        <Notifier />
        {isOpen && <Modal />}
      </ErrorBoundary>
    </>
  );
};
