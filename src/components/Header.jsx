import React from 'react';
import { Plane } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-6 px-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <img src="/logo.png" alt="Vigovia Logo" className="h-20 w-auto" aria-label="Vigovia Logo" />
      </div>
    </header>
  );
};

export default Header;