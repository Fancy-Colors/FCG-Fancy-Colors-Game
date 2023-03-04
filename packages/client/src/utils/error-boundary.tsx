import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
    return { error, errorInfo };
  }

  public render() {
    if (this.state.error) {
      return <p>Произошла ошибка :(</p>;
    }

    return this.props.children;
  }
}
