import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import EmailPage from '@/pages/EmailPage';
import { EmailProvider } from '@/contexts/EmailContext';

const App = () => {
  return (
    <EmailProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/email/:emailId" element={<EmailPage />} />
        </Routes>
        <Toaster />
      </div>
    </EmailProvider>
  );
};

export default App;