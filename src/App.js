import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MintForm from './components/MintForm';
import BurnForm from './components/BurnForm';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Main application component for Stablecoin Dashboard.
 * It orchestrates the overall UI structure, wrapping sub-components in an ErrorBoundary for graceful error handling.
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="App container mt-5">
        <header className="mb-5">
          <h1>Stablecoin Dashboard</h1>
        </header>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <MintForm />
          </div>
          <div className="col-md-6">
            <BurnForm />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
