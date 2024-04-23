import React, { Component } from "react";

/**
 * An error boundary component in React. Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  /**
   * Updates state so the next render will show the fallback UI.
   * @param {Error} error The error that triggered the fallback.
   * @returns {Object} The state update to be applied.
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * This lifecycle method is invoked after an error has been thrown by a descendant component.
   * It receives the error that was thrown as a parameter and should be used for error logging.
   * @param {Error} error The error that was caught.
   * @param {Object} errorInfo A component stack trace from where the error was thrown.
   */
  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by Error Boundary:", error);
    console.error("Detailed info:", errorInfo.componentStack);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && <div>{this.state.errorInfo}</div>}
            <br />
            Please try reloading the page, or contact support if the problem persists.
          </details>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
