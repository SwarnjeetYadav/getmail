import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEmail } from '@/contexts/EmailContext';

const HeroSection = () => {
  const { activeEmail, loading, generateEmail } = useEmail();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (!activeEmail) return;
    
    navigator.clipboard.writeText(activeEmail.address)
      .then(() => {
        setCopied(true);
        toast({
          title: "Email copied!",
          description: "Email address copied to clipboard",
          duration: 2000,
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      });
  };

  const handleViewInbox = () => {
    if (!activeEmail) return;
    navigate(`/email/${activeEmail.id}`);
  };

  return (
    <section className="py-12 md:py-20 gradient-bg">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Temporary Email Generator
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Generate disposable email addresses instantly. Protect your privacy and avoid spam.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-6 md:p-8 rounded-xl max-w-3xl mx-auto mb-8"
        >
          <div className="mb-6">
            {activeEmail ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xl md:text-2xl font-mono bg-gray-800 p-3 rounded-lg text-blue-300 w-full md:w-auto overflow-x-auto">
                  {activeEmail.address}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopyEmail} 
                    variant="secondary" 
                    className="flex items-center gap-2"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button 
                    onClick={handleViewInbox} 
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    View Inbox
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 p-4 border border-dashed border-gray-700 rounded-lg">
                No active email address. Generate one below.
              </div>
            )}
          </div>
          
          <Button 
            onClick={generateEmail} 
            disabled={loading} 
            className="w-full py-6 text-lg"
          >
            {loading ? (
              <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Mail className="h-5 w-5 mr-2" />
            )}
            {loading ? "Generating..." : "Generate New Email"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;