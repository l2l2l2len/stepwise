import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Solver from './Solver';
import CalculatorPage from './Calculator';
import DailyRecall from './DailyRecall';
import Scanner from './Scanner';
import SettingsPage from './Settings';
import Onboarding from './Onboarding';

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

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('stepwise_onboarding_complete') === 'true';
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('stepwise_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
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

  useEffect(() => {
    localStorage.setItem('stepwise_settings', JSON.stringify(settings));
  }, [settings]);

  const completeOnboarding = () => {
    localStorage.setItem('stepwise_onboarding_complete', 'true');
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

  return (
    <div className={`min-h-screen flex bg-enterprise-bg overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {!isOnboarding && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpen={() => setIsSidebarOpen(true)}
        />
      )}

      <main className={`flex-1 flex flex-col relative transition-all duration-300 ${!isScanner && !isOnboarding ? 'md:pl-72' : ''}`}>
        <Routes>
          <Route path="/onboarding" element={<Onboarding onComplete={completeOnboarding} />} />
          <Route path="/" element={<Scanner onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="/solver" element={<Solver onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="/calculator" element={<CalculatorPage onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="/recall" element={<DailyRecall onMenuClick={() => setIsSidebarOpen(true)} />} />
          <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} onMenuClick={() => setIsSidebarOpen(true)} />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
