import React, { useState } from 'react';
import '../styles/LeadsPage.css';
import LeadsFormCreate from '../components/LeadsFormCreate';
import LeadsFormList from '../components/LeadsFormList.jsx';

function LeadsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLeadSubmitted = () => {
    setRefreshTrigger(prev => prev + 1); 
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen p-6 gap-6">
      <LeadsFormCreate onLeadSubmitted={handleLeadSubmitted} />
      <LeadsFormList refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default LeadsPage;
