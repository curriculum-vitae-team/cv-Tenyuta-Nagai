import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Spinner } from '../Spinner';
import { ErrorBoundary } from '../ErrorBoundary';

export const Layout = () => {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
};
