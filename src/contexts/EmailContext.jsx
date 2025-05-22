import React, { createContext, useContext, useState, useEffect } from 'react';

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [activeEmail, setActiveEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmails = localStorage.getItem('tempEmails');
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    }

    const savedReceivedEmails = localStorage.getItem('receivedEmails');
    if (savedReceivedEmails) {
      setReceivedEmails(JSON.parse(savedReceivedEmails));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tempEmails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('receivedEmails', JSON.stringify(receivedEmails));
  }, [receivedEmails]);

  const generateEmail = () => {
    setLoading(true);
    
    setTimeout(() => {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let username = '';
      for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      const domains = ['gettogether.site', 'getmail.com'];    //'tempmail.com', 'quickmail.org', 'disposable.net', 
      const domain = domains[Math.floor(Math.random() * domains.length)];
      
      const newEmail = {
        id: Date.now().toString(),
        address: `${username}@${domain}`,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      
      setEmails(prevEmails => [newEmail, ...prevEmails]);
      setActiveEmail(newEmail);
      setLoading(false);
      
      generateFakeEmails(newEmail.address);
    }, 1500);
  };

  const generateFakeEmails = (emailAddress) => {
    const senders = [
      { name: 'Netflix', email: 'info@netflix.com' },
      { name: 'Amazon', email: 'orders@amazon.com' },
      { name: 'Spotify', email: 'no-reply@spotify.com' },
      { name: 'LinkedIn', email: 'notifications@linkedin.com' },
      { name: 'Twitter', email: 'info@twitter.com' }
    ];
    
    const subjects = [
      'Welcome to our service!',
      'Your account has been created',
      'Verify your email address',
      'Important security notification',
      'Your subscription is active'
    ];
    
    const bodies = [
      'Thank you for signing up to our service. We are excited to have you on board!',
      'Your account has been successfully created. You can now access all our features.',
      'Please verify your email address by clicking the link below to activate your account.',
      'We noticed a new login to your account. If this was not you, please secure your account immediately.',
      'Your subscription has been activated. Enjoy premium access to all our features.'
    ];
    
    const emailCount = Math.floor(Math.random() * 3) + 1;
    const newGeneratedEmails = [];
    
    for (let i = 0; i < emailCount; i++) {
      const sender = senders[Math.floor(Math.random() * senders.length)];
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const body = bodies[Math.floor(Math.random() * bodies.length)];
      const minutesAgo = Math.floor(Math.random() * 3) + 1;
      const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
      
      newGeneratedEmails.push({
        id: Date.now().toString() + i,
        to: emailAddress,
        from: sender,
        subject,
        body,
        timestamp,
        read: false
      });
    }
    
    setReceivedEmails(prev => [...newGeneratedEmails, ...prev]);
  };

  const deleteEmail = (emailId) => {
    setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId));
    if (activeEmail && activeEmail.id === emailId) {
      setActiveEmail(null);
    }
    const emailToDelete = emails.find(email => email.id === emailId);
    if (emailToDelete) {
      setReceivedEmails(prev => prev.filter(email => email.to !== emailToDelete.address));
    }
  };

  const setActive = (emailId) => {
    const email = emails.find(email => email.id === emailId);
    setActiveEmail(email || null);
  };

  const markAsRead = (emailId) => {
    setReceivedEmails(prev => 
      prev.map(email => 
        email.id === emailId ? { ...email, read: true } : email
      )
    );
  };

  const deleteReceivedEmail = (emailId) => {
    setReceivedEmails(prev => prev.filter(email => email.id !== emailId));
  };

  const getEmailsForAddress = (address) => {
    return receivedEmails.filter(email => email.to === address);
  };

  return (
    <EmailContext.Provider value={{
      emails,
      activeEmail,
      receivedEmails,
      loading,
      generateEmail,
      deleteEmail,
      setActive,
      markAsRead,
      deleteReceivedEmail,
      getEmailsForAddress
    }}>
      {children}
    </EmailContext.Provider>
  );
};