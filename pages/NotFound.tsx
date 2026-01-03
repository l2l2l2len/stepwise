import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#121212] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-2">
          <div className="text-8xl font-black text-apple-blue tracking-tighter">404</div>
          <h1 className="text-3xl font-bold text-apple-darkGray dark:text-white tracking-tight">
            Page not found
          </h1>
          <p className="text-apple-gray dark:text-[#A1A1A6] text-lg leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-apple-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
          >
            <Home size={18} />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-black/5 dark:bg-white/10 text-apple-darkGray dark:text-white rounded-xl font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/10">
          <p className="text-sm text-apple-gray dark:text-[#A1A1A6] mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/solver" className="text-apple-blue hover:underline font-medium">AI Solver</Link>
            <span className="text-apple-gray">·</span>
            <Link to="/calculator" className="text-apple-blue hover:underline font-medium">Calculator</Link>
            <span className="text-apple-gray">·</span>
            <Link to="/recall" className="text-apple-blue hover:underline font-medium">Flashcards</Link>
            <span className="text-apple-gray">·</span>
            <Link to="/faq" className="text-apple-blue hover:underline font-medium">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
