
import React, { useState, useEffect } from 'react';
import PasscodeLock from './components/PasscodeLock';
import SecureDashboard from './components/SecureDashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-white">
      {!isAuthenticated ? (
        <PasscodeLock onSuccess={handleAuthSuccess} />
      ) : (
        <SecureDashboard />
      )}
    </div>
  );
};

export default App;
