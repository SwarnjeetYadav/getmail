import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import EmailListSection from '@/components/home/EmailListSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <EmailListSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;