import React from 'react';
import { Mail, Shield, Clock, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-md">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                GetMail
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Protect your privacy with disposable email addresses. Avoid spam and keep your inbox clean.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-lg font-semibold mb-4">Features</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Instant Email Generation</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacy Protection</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Auto-Expiring Addresses</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="text-lg font-semibold mb-4">Links</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} GetMail. All rights reserved.</p>
          <p className="mt-1">This is a demo application. Emails are not actually sent or received.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;