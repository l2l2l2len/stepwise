import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Calculator,
  BrainCircuit,
  Camera,
  X,
  ChevronRight,
  Settings,
  Zap,
  Shield
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Scanner', icon: Camera, description: 'Capture & analyze' },
    { path: '/solver', label: 'AI Solver', icon: Sparkles, description: 'Step-by-step solutions' },
    { path: '/calculator', label: 'Calculator', icon: Calculator, description: 'Scientific computing' },
    { path: '/recall', label: 'Daily Recall', icon: BrainCircuit, description: 'Spaced repetition' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] md:hidden transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container - Enterprise Navy Theme */}
      <aside
        className={`fixed inset-y-0 left-0 z-[200] w-72 bg-enterprise-navy transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">

          {/* Top Branding Section */}
          <div className="p-6 pt-12 md:pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Gradient Logo */}
                <div className="w-11 h-11 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-xl flex items-center justify-center shadow-lg shadow-enterprise-blue/30">
                  <span className="font-extrabold text-white text-xl">S</span>
                </div>
                <div className="flex flex-col -space-y-0.5">
                  <span className="font-bold text-xl tracking-tight text-white">Stepwise</span>
                  <span className="text-[10px] font-semibold text-enterprise-blue uppercase tracking-widest">AI Platform</span>
                </div>
              </div>
              <button onClick={onClose} className="md:hidden p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3 ml-3">Features</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    active
                      ? 'bg-gradient-to-r from-enterprise-blue to-enterprise-purple text-white shadow-lg shadow-enterprise-blue/20'
                      : 'hover:bg-white/[0.08] text-white/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                      active
                        ? 'bg-white/20'
                        : 'bg-white/[0.06] group-hover:bg-white/10'
                    }`}>
                      <Icon size={18} strokeWidth={2.5} className={active ? 'text-white' : 'text-white/80'} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[14px] font-semibold ${active ? 'text-white' : 'text-white/90'}`}>
                        {item.label}
                      </span>
                      <span className={`text-[11px] ${active ? 'text-white/70' : 'text-white/40'}`}>
                        {item.description}
                      </span>
                    </div>
                  </div>
                  {active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm relative z-10" />
                  )}
                  {!active && (
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-60 transition-opacity text-white/60" strokeWidth={2.5} />
                  )}
                </Link>
              );
            })}

            <div className="pt-8 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3 ml-3">System</div>
            <Link
              to="/settings"
              onClick={onClose}
              className={`w-full flex items-center space-x-3 px-3 py-3.5 rounded-xl transition-all group ${
                isActive('/settings')
                  ? 'bg-gradient-to-r from-enterprise-blue to-enterprise-purple text-white shadow-lg shadow-enterprise-blue/20'
                  : 'hover:bg-white/[0.08] text-white/70 hover:text-white'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isActive('/settings')
                  ? 'bg-white/20'
                  : 'bg-white/[0.06] group-hover:bg-white/10'
              }`}>
                <Settings size={18} strokeWidth={2.5} className={isActive('/settings') ? 'text-white' : 'text-white/80'} />
              </div>
              <span className="text-[14px] font-semibold">Settings</span>
            </Link>
          </nav>

          {/* Footer - Enterprise Info Card */}
          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-br from-enterprise-blue/20 to-enterprise-purple/20 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-7 h-7 bg-enterprise-blue/30 rounded-lg flex items-center justify-center">
                  <Zap size={14} className="text-enterprise-blueLight" />
                </div>
                <span className="text-[11px] font-bold text-enterprise-blueLight uppercase tracking-wider">Free Forever</span>
              </div>
              <p className="text-[12px] font-medium text-white/60 leading-relaxed">
                Enterprise-grade AI. No account needed. All data stored locally.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center space-x-2">
              <Shield size={12} className="text-white/30" />
              <span className="text-[10px] text-white/30 font-medium">Privacy First Platform</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
