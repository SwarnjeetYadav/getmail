import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EmailView = ({ email }) => {
  const { toast } = useToast();
  
  const handleCopyContent = (content, type) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast({
          title: `${type} copied!`,
          description: `${type} copied to clipboard`,
          duration: 2000,
        });
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-xl font-bold mb-3">{email.subject}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-semibold">From:</span>
            <span>{email.from.name} &lt;{email.from.email}&gt;</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-semibold">Date:</span>
            <span>{formatDate(email.timestamp)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto bg-gray-850 p-4 rounded-lg mb-4">
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line">{email.body}</p>
          
          <div className="mt-6 p-4 border border-gray-700 rounded-lg">
            <p>Hello,</p>
            <p className="mt-4">
              Thank you for using our service. This is a sample email to demonstrate the functionality of our temporary email system.
            </p>
            <p className="mt-4">
              With GetMail, you can:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Generate disposable email addresses</li>
              <li>Receive emails without revealing your personal information</li>
              <li>Protect yourself from spam and unwanted marketing</li>
              <li>Use temporary emails for sign-ups and registrations</li>
            </ul>
            <p className="mt-4">
              If you have any questions, please don't hesitate to contact our support team.
            </p>
            <p className="mt-4">
              Best regards,<br />
              The GetMail Team
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={() => handleCopyContent(email.subject, 'Subject')}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Subject
        </Button>
        <Button 
          onClick={() => handleCopyContent(email.body, 'Content')}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Content
        </Button>
      </div>
    </motion.div>
  );
};

export default EmailView;