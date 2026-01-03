import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ErrorBoundary from './pages/ErrorBoundary';

// Lazy load pages for code splitting
const Solver = lazy(() => import('./Solver'));
const CalculatorPage = lazy(() => import('./Calculator'));
const DailyRecall = lazy(() => import('./DailyRecall'));
const Scanner = lazy(() => import('./Scanner'));
const SettingsPage = lazy(() => import('./Settings'));
const Onboarding = lazy(() => import('./Onboarding'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const FAQ = lazy(() => import('./pages/FAQ'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const NotFound = lazy(() => import('./pages/NotFound'));

export interface AppSettings {
  decimalSign: 'dot' | 'comma';
  divisionMethod: number;
  multiplicationMethod: number;
  binomialNotation: string;
  repeatingDecimal: string;
  theme: 'system' | 'light' | 'dark';
  hapticFeedback: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  decimalSign: 'dot',
  divisionMethod: 0,
  multiplicationMethod: 0,
  binomialNotation: 'parentheses',
  repeatingDecimal: 'bar',
  theme: 'system',
  hapticFeedback: true
};

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex-1 flex items-center justify-center bg-[#FBFBFD] dark:bg-[#121212] min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-apple-blue/20 border-t-apple-blue rounded-full animate-spin" />
      <span className="text-apple-gray dark:text-[#A1A1A6] font-medium">Loading...</span>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('stepwise_onboarding_complete') === 'true';
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('stepwise_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Track system dark mode preference
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Save settings to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('stepwise_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }
  }, [settings]);

  const completeOnboarding = () => {
    try {
      localStorage.setItem('stepwise_onboarding_complete', 'true');
    } catch (e) {
      console.warn('Failed to save onboarding status:', e);
    }
    setHasSeenOnboarding(true);
  };

  const location = useLocation();
  const isScanner = location.pathname === '/';
  const isOnboarding = location.pathname === '/onboarding';

  if (!hasSeenOnboarding && !isOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  // Determine if dark mode should be applied
  const isDarkMode = settings.theme === 'dark' || (settings.theme === 'system' && systemPrefersDark);

  const menuClickHandler = () => setIsSidebarOpen(true);

  return (
    <div className={`min-h-screen flex bg-[#FBFBFD] overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {!isOnboarding && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpen={() => setIsSidebarOpen(true)}
        />
      )}

      <main className={`flex-1 flex flex-col relative transition-all duration-300 ${!isScanner && !isOnboarding ? 'md:pl-72' : ''}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/onboarding" element={<Onboarding onComplete={completeOnboarding} />} />
            <Route path="/" element={<Scanner onMenuClick={menuClickHandler} />} />
            <Route path="/solver" element={<Solver onMenuClick={menuClickHandler} />} />
            <Route path="/calculator" element={<CalculatorPage onMenuClick={menuClickHandler} />} />
            <Route path="/recall" element={<DailyRecall onMenuClick={menuClickHandler} />} />
            <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} onMenuClick={menuClickHandler} />} />
            <Route path="/about" element={<About onMenuClick={menuClickHandler} />} />
            <Route path="/contact" element={<Contact onMenuClick={menuClickHandler} />} />
            <Route path="/terms" element={<Terms onMenuClick={menuClickHandler} />} />
            <Route path="/privacy" element={<Privacy onMenuClick={menuClickHandler} />} />
            <Route path="/faq" element={<FAQ onMenuClick={menuClickHandler} />} />
            <Route path="/how-it-works" element={<HowItWorks onMenuClick={menuClickHandler} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
