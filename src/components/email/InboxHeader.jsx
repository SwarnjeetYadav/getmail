import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const InboxHeader = ({ emailAddress, onRefresh, refreshing }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        toast({
          title: "Email copied!",
          description: "Email address copied to clipboard",
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

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="w-fit"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button 
          variant="outline" 
          onClick={handleCopyEmail}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Address
        </Button>
        
        <Button 
          onClick={onRefresh} 
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Checking...' : 'Check for New Emails'}
        </Button>
      </div>
    </div>
  );
};

export default InboxHeader;