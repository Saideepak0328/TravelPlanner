import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const tourPackages = [
    'Bali Tour Packages', 'Japan Tour Packages', 'Vietnam Tour Packages', 'Malaysia Tour Packages',
    'Thailand Tour Packages', 'Europe Tour Packages', 'Cultural Tour Packages', 'Luxury Tour Packages',
    'Dubai Tour Packages', 'Turkey Tour Packages', 'UAE Tour Packages', 'Singapore Tour Packages',
    'Australia Tour Packages', 'South Korea Tour Packages', 'Honeymoon Tour Packages', 'Adventure Tour Packages'
  ];

  const footerSections = {
    'Our offerings': [
      'Holidays',
      'Visa',
      'Forex',
      'Hotels',
      'Flights'
    ],
    'Popular destinations': [
      'Dubai',
      'Bali',
      'Thailand',
      'Singapore',
      'Malaysia'
    ],
    'Vigovia Specials': [
      'Featured Experience',
      'Group Tours',
      'Backpackers Club',
      'Offline Events'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Vigovia Blog',
      'Partner Portal',
      'Accreditations'
    ],
    'More': [
      'Investor Relations',
      'Forex',
      'FAQs',
      'Domestic Holidays'
    ]
  };

  return (
    <footer className="bg-white pt-8">
      {/* Top: Tour Packages */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-700 font-medium mb-4">
          {tourPackages.map((packageName, index) => (
            <a
              key={index}
              href="#"
              className="hover:text-purple-700 transition-colors px-2 py-1"
            >
              {packageName}
            </a>
          ))}
        </div>
        <hr className="border-gray-300 mb-4" />
      </div>

      {/* Middle: Links and Contact */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Footer Links Sections */}
          {Object.entries(footerSections).map(([title, links], i) => (
            <div key={title} className="md:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-purple-700 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Contact Information */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div className="bg-purple-100 rounded-lg p-4 mb-4 text-right">
              <div className="text-purple-800 font-semibold text-xs mb-1">Need help? Call us</div>
              <div className="text-purple-900 font-bold text-base">+91-98xxx64641</div>
            </div>
            <div className="text-xs text-right mb-2">
              <div className="font-semibold text-gray-900">Email</div>
              <div className="text-gray-700">contact@vigovia.com</div>
            </div>
            <div className="text-xs text-right">
              <div className="font-semibold text-gray-900">Address</div>
              <div className="text-gray-700">HD-109 Cinnabar Hills,Links Business Park,Bangalore<br/>North,Bangalore,Karnataka,India-560071</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Logo, Payments, Social, Legal */}
      <div className="bg-purple-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-white text-2xl font-bold">vigovia</span>
              <span className="text-purple-200 text-xs font-medium tracking-wide">PLAN.PACK.GO</span>
            </div>
            <div className="ml-8">
              <span className="text-white text-sm font-semibold mr-2">Payments</span>
              <span className="inline-block bg-white px-2 py-1 rounded mr-2 text-xs font-bold text-blue-700">razorpay</span>
              <span className="inline-block bg-white px-2 py-1 rounded text-xs font-bold text-purple-700">stripe</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a href="#" aria-label="Facebook" className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"><Facebook className="w-5 h-5 text-purple-700" /></a>
            <a href="#" aria-label="Instagram" className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"><Instagram className="w-5 h-5 text-purple-700" /></a>
            <a href="#" aria-label="LinkedIn" className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"><Linkedin className="w-5 h-5 text-purple-700" /></a>
            <a href="#" aria-label="YouTube" className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"><Youtube className="w-5 h-5 text-purple-700" /></a>
          </div>
          <div className="flex space-x-6 text-xs text-purple-100">
            <a href="#" aria-label="Privacy policy" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="#" aria-label="Legal notice" className="hover:text-white transition-colors">Legal notice</a>
            <a href="#" aria-label="Accessibility" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
        <div className="text-center text-xs text-purple-200 mt-4">© 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;