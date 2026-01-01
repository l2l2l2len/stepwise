import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Calculator, 
  BrainCircuit, 
  Camera, 
  History, 
  X, 
  ChevronRight, 
  Settings, 
  User,
  Star,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Scanner', icon: Camera, color: 'text-apple-blue' },
    { path: '/solver', label: 'Solver', icon: Sparkles, color: 'text-purple-500' },
    { path: '/calculator', label: 'Scientific', icon: Calculator, color: 'text-apple-success' },
    { path: '/recall', label: 'Daily Recall', icon: BrainCircuit, color: 'text-apple-warning' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/15 backdrop-blur-sm z-[150] md:hidden transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-[200] w-72 apple-blur border-r border-black/[0.05] shadow-[20px_0_60px_rgba(0,0,0,0.06)] transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden bg-white/80">
          
          {/* Top Branding Section */}
          <div className="p-8 pb-4 pt-12 md:pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-apple-blue rounded-[12px] flex items-center justify-center shadow-lg shadow-apple-blue/20">
                  <span className="font-extrabold text-white text-xl">S</span>
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="font-bold text-xl tracking-tighter text-apple-darkGray">Stepwise</span>
                  <span className="text-[11px] font-extrabold text-apple-success uppercase tracking-[0.2em]">Unlimited</span>
                </div>
              </div>
              <button onClick={onClose} className="md:hidden p-2 text-apple-gray hover:bg-black/5 rounded-full transition-colors">
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-bold text-apple-gray/60 uppercase tracking-[0.2em] mb-4 ml-4">Library</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    active 
                      ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/25' 
                      : 'hover:bg-black/[0.04] text-apple-darkGray'
                  }`}
                >
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className={`${active ? 'text-white' : item.color} transition-colors`}>
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className={`text-[16px] font-bold tracking-tight ${active ? 'text-white' : 'text-apple-darkGray'}`}>
                      {item.label}
                    </span>
                  </div>
                  {active ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm relative z-10" />
                  ) : (
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" strokeWidth={3} />
                  )}
                </Link>
              );
            })}

            <div className="pt-10 text-[11px] font-bold text-apple-gray/60 uppercase tracking-[0.2em] mb-4 ml-4">System</div>
            <button className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl hover:bg-black/[0.04] text-apple-darkGray transition-all group">
              <History size={20} strokeWidth={2.5} className="text-apple-gray group-hover:text-apple-blue" />
              <span className="text-[16px] font-bold tracking-tight">Recent Insights</span>
            </button>
            <Link
              to="/settings"
              onClick={onClose}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all group ${
                isActive('/settings') ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/25' : 'hover:bg-black/[0.04] text-apple-darkGray'
              }`}
            >
              <Settings size={20} strokeWidth={2.5} className={`${isActive('/settings') ? 'text-white' : 'text-apple-gray group-hover:text-apple-blue'}`} />
              <span className="text-[16px] font-bold tracking-tight">Settings</span>
            </Link>
          </nav>

          {/* User Profile / Footer */}
          <div className="p-6 mt-auto border-t border-black/[0.05]">
            <div className="bg-gradient-to-tr from-apple-success/[0.08] to-apple-blue/[0.08] p-5 rounded-[24px] border border-apple-success/10 mb-6 group cursor-pointer transition-all shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 bg-apple-success/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck size={16} className="text-apple-success" />
                </div>
                <span className="text-[10px] font-extrabold text-apple-success uppercase tracking-widest">Full Access</span>
              </div>
              <p className="text-[13px] font-bold text-apple-darkGray leading-relaxed pr-2">
                All premium features are unlocked for your account.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.03] border border-black/[0.02] hover:bg-black/[0.05] transition-all cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-apple-blue flex items-center justify-center text-white shadow-md border-2 border-white">
                  <User size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-[15px] font-bold text-apple-darkGray">John Smith</span>
                  <span className="text-[11px] font-bold text-apple-success uppercase tracking-tighter">Master Member</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-apple-gray/40" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;