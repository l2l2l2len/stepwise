import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.hash = '/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#121212] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="w-20 h-20 bg-apple-danger/10 rounded-3xl flex items-center justify-center mx-auto">
              <AlertTriangle size={40} className="text-apple-danger" />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-apple-darkGray dark:text-white tracking-tight">
                Something went wrong
              </h1>
              <p className="text-apple-gray dark:text-[#A1A1A6] text-lg leading-relaxed">
                We encountered an unexpected error. Don't worry, your data is safe in your browser's local storage.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 border border-black/5 dark:border-white/10">
              <p className="text-sm text-apple-gray dark:text-[#A1A1A6] font-mono break-all">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-apple-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                <RefreshCw size={18} />
                <span>Try Again</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-black/5 dark:bg-white/10 text-apple-darkGray dark:text-white rounded-xl font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                <Home size={18} />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
