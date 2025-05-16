import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Mail, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InboxSidebar = ({ inboxEmails, selectedEmail, onSelectEmail, onDeleteEmail }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Mail className="h-5 w-5 mr-2" />
        Inbox ({inboxEmails.length})
      </h2>
      
      <div className="email-list overflow-y-auto max-h-[600px]">
        {inboxEmails.length > 0 ? (
          <AnimatePresence>
            {inboxEmails.map(email => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                  selectedEmail && selectedEmail.id === email.id 
                    ? 'bg-blue-900/30 border border-blue-500' 
                    : email.read 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-700/80 border-l-4 border-blue-500 hover:bg-gray-600'
                }`}
                onClick={() => onSelectEmail(email)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold truncate mr-2">
                    {email.from.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEmail(email.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
                  </Button>
                </div>
                <div className="text-sm text-gray-300 truncate mb-1">{email.subject}</div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{email.from.email}</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(email.timestamp)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No emails in this inbox yet</p>
            <p className="text-gray-500 mt-2">New emails will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxSidebar;