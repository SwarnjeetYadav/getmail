import React from 'react';
import { Mail } from 'lucide-react';
import EmailView from '@/components/EmailView';

const InboxDetailView = ({ selectedEmail }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full">
      {selectedEmail ? (
        <EmailView email={selectedEmail} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <Mail className="h-16 w-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">No Email Selected</h3>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            Select an email from your inbox to view its contents here
          </p>
        </div>
      )}
    </div>
  );
};

export default InboxDetailView;