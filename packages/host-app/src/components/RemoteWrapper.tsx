import React, { Suspense, useState, useEffect } from 'react';

interface RemoteWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

const RemoteWrapper: React.FC<RemoteWrapperProps> = ({ 
  children, 
  fallback = <div>Loading...</div>,
  errorFallback = <div>Failed to load remote component. Please try refreshing the page.</div>
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Reset error state when retry count changes
    if (retryCount > 0) {
      setHasError(false);
    }
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {errorFallback}
        <br />
        <button 
          onClick={handleRetry}
          style={{ marginTop: '10px', padding: '8px 16px' }}
        >
          Retry ({retryCount} attempts)
        </button>
      </div>
    );
  }

  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary onError={() => setHasError(true)}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: () => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default RemoteWrapper;
