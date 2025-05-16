import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useEmail } from '@/contexts/EmailContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InboxHeader from '@/components/email/InboxHeader';
import InboxEmailInfo from '@/components/email/InboxEmailInfo';
import InboxSidebar from '@/components/email/InboxSidebar';
import InboxDetailView from '@/components/email/InboxDetailView';

const EmailPage = () => {
  const { emailId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    emails, 
    receivedEmails, 
    markAsRead, 
    deleteReceivedEmail, 
    getEmailsForAddress 
  } = useEmail();
  
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [inboxEmails, setInboxEmails] = useState([]);
  
  useEffect(() => {
    const email = emails.find(e => e.id === emailId);
    if (!email) {
      navigate('/');
      return;
    }
    
    setEmailAddress(email.address);
    updateInboxEmails(email.address);
  }, [emailId, emails, navigate, receivedEmails, getEmailsForAddress]);
  
  const updateInboxEmails = (address) => {
    const filtered = getEmailsForAddress(address);
    setInboxEmails(filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (Math.random() < 0.3 && emailAddress) {
        const senders = [
          { name: 'PayPal', email: 'service@paypal.com' },
          { name: 'Google', email: 'no-reply@google.com' },
          { name: 'Microsoft', email: 'account@microsoft.com' }
        ];
        const subjects = ['Your account security', 'Confirmation required', 'New sign-in notification'];
        const bodies = [
          'We noticed a new sign-in to your account. If this was you, you can ignore this message.',
          'Please confirm your recent activity by clicking the link below.',
          'Thank you for using our service. Here is your confirmation code: 123456.'
        ];
        const sender = senders[Math.floor(Math.random() * senders.length)];
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const body = bodies[Math.floor(Math.random() * bodies.length)];
        const newEmail = {
          id: Date.now().toString(),
          to: emailAddress,
          from: sender,
          subject,
          body,
          timestamp: new Date().toISOString(),
          read: false
        };
        
        const updatedReceivedEmails = [newEmail, ...receivedEmails];
        localStorage.setItem('receivedEmails', JSON.stringify(updatedReceivedEmails));

        updateInboxEmails(emailAddress); 
        
        toast({
          title: "New email received!",
          description: `From: ${sender.name}`,
        });
      } else {
        toast({
          title: "No new emails",
          description: "Your inbox is up to date",
        });
      }
      setRefreshing(false);
    }, 1500);
  };
  
  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    if (!email.read) {
      markAsRead(email.id);
    }
  };
  
  const handleDeleteSelectedEmail = (id) => {
    deleteReceivedEmail(id);
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
    toast({
      title: "Email deleted",
      description: "The email has been removed from your inbox",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <InboxHeader 
            emailAddress={emailAddress}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
          <InboxEmailInfo emailAddress={emailAddress} />
          
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-5 lg:col-span-4">
              <InboxSidebar 
                inboxEmails={inboxEmails}
                selectedEmail={selectedEmail}
                onSelectEmail={handleSelectEmail}
                onDeleteEmail={handleDeleteSelectedEmail}
              />
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              <InboxDetailView selectedEmail={selectedEmail} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailPage;