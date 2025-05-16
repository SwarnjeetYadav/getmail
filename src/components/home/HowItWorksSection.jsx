import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Clock } from 'lucide-react';

const HowItWorksSection = () => {
  const features = [
    {
      icon: <Mail className="h-6 w-6 text-blue-400" />,
      title: "Generate",
      description: "Create a random, disposable email address with a single click. No registration required."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: "Protect",
      description: "Keep your real email address private. Use temporary emails for sign-ups and one-time services."
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-400" />,
      title: "Expire",
      description: "Emails automatically expire after 24 hours, leaving no trace and keeping your digital footprint minimal."
    }
  ];

  return (
    <section className="py-12 bg-gray-800">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900 p-6 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-600/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;