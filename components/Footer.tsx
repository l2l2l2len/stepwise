import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'About', path: '/about' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
  ];

  return (
    <footer className="bg-white dark:bg-[#1E1E1E] border-t border-black/5 dark:border-white/10 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-apple-blue rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">S</span>
            </div>
            <div>
              <span className="font-bold text-apple-darkGray dark:text-white">Stepwise</span>
              <span className="text-apple-gray dark:text-[#A1A1A6] text-sm ml-2">Math, made clear.</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-apple-gray dark:text-[#A1A1A6] hover:text-apple-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-apple-gray dark:text-[#A1A1A6]">
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart size={14} className="text-apple-danger fill-apple-danger" />
            <span>for learners everywhere</span>
          </div>
          <span>&copy; {currentYear} Stepwise. Free and open for everyone.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
