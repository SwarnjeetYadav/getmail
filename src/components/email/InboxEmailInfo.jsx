import React from 'react';

const InboxEmailInfo = ({ emailAddress }) => {
  return (
    <div className="glass-card p-4 rounded-lg mb-6">
      <h1 className="text-xl font-bold mb-2">Inbox for:</h1>
      <div className="font-mono text-blue-300 text-lg break-all">{emailAddress}</div>
    </div>
  );
};

export default InboxEmailInfo;