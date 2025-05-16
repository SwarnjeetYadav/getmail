import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEmail } from '@/contexts/EmailContext';

const EmailListSection = () => {
  const { emails, activeEmail, deleteEmail, setActive } = useEmail();
  const { toast } = useToast();

  const handleDeleteEmail = (id, e) => {
    e.stopPropagation();
    deleteEmail(id);
    toast({
      title: "Email deleted",
      description: "Temporary email has been deleted",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const calculateTimeLeft = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Email Addresses</h2>
        
        {emails.length > 0 ? (
          <div className="grid gap-4">
            {emails.map(email => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  activeEmail && activeEmail.id === email.id 
                    ? 'bg-blue-900/30 border border-blue-500' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setActive(email.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="font-mono text-blue-300">{email.address}</div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Expires in: {calculateTimeLeft(email.expiresAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Mail className="h-4 w-4" />
                      <span>Created: {formatDate(email.createdAt)}</span>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={(e) => handleDeleteEmail(email.id, e)}
                      className="ml-auto md:ml-0"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-800 rounded-lg">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No email addresses generated yet.</p>
            <p className="text-gray-500 mt-2">Click the button above to create your first temporary email.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailListSection;