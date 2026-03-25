import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Configuration Error
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                The application is not properly configured
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                Missing Environment Variables
              </h2>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                The following environment variables are required:
              </p>
              <ul className="text-sm text-red-800 dark:text-red-300 space-y-1 mb-3">
                <li className="font-mono">• VITE_SUPABASE_URL</li>
                <li className="font-mono">• VITE_SUPABASE_ANON_KEY</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                How to Fix (Vercel Deployment):
              </h3>
              <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                <li>
                  <strong>1.</strong> Go to Vercel Dashboard → Your Project → <strong>Settings</strong>
                </li>
                <li>
                  <strong>2.</strong> Click <strong>Environment Variables</strong>
                </li>
                <li>
                  <strong>3.</strong> Add the following variables:
                  <div className="mt-2 bg-blue-100 dark:bg-blue-900/20 p-3 rounded font-mono text-xs">
                    <div className="mb-2">
                      <div className="text-blue-900 dark:text-blue-100">VITE_SUPABASE_URL</div>
                      <div className="text-blue-700 dark:text-blue-300">https://znjotcubcutqhpkylhju.supabase.co</div>
                    </div>
                    <div>
                      <div className="text-blue-900 dark:text-blue-100">VITE_SUPABASE_ANON_KEY</div>
                      <div className="text-blue-700 dark:text-blue-300 break-all">
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                        (See ENVIRONMENT_VARIABLES.txt for full key)
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <strong>4.</strong> Make sure to check all environments: ✅ Production ✅ Preview ✅ Development
                </li>
                <li>
                  <strong>5.</strong> Go to <strong>Deployments</strong> → Click <strong>...</strong> → <strong>Redeploy</strong>
                </li>
                <li>
                  <strong>6.</strong> <strong>UNCHECK</strong> "Use existing Build Cache"
                </li>
                <li>
                  <strong>7.</strong> Click <strong>Redeploy</strong> and wait 2-3 minutes
                </li>
              </ol>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>

            {this.state.error && (
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                  Technical Details
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
