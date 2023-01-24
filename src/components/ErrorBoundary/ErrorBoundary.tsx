import React, { Component } from 'react';

import ErrorPage from '../../pages/ErrorPage';
import { IErrorProps, IErrorState } from './ErrorBoundary.interface';

export class ErrorBoundary extends Component<IErrorProps, IErrorState> {
  constructor(props: IErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage pageNotFound={false} />;
    }

    return this.props.children;
  }
}
