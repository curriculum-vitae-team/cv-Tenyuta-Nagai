import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Spinner } from '../Spinner';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
