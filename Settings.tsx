import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Globe, Moon, Sun, Smartphone, Info, Sparkles, Zap, Heart, Database, Menu, Settings } from 'lucide-react';
import { AppSettings } from './App';

interface SettingsPageProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onMenuClick: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings, onMenuClick }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'main' | 'methods' | 'decimal' | 'appearance' | 'about'>('main');

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const MethodIcon = ({ type, variant }: { type: 'div' | 'mul', variant: number }) => {
    if (type === 'div') {
      return (
        <div className="flex flex-col items-center space-y-1 scale-125">
          {variant === 0 && (
            <div className="flex flex-col items-center">
              <div className="text-[10px] text-enterprise-blue font-bold">?</div>
              <div className="flex items-end">
                <div className="w-1.5 h-3 bg-enterprise-blue/20 rounded-sm mr-0.5" />
                <div className="w-4 h-2 bg-enterprise-blue rounded-sm mb-0.5" />
                <div className="w-4 h-2 bg-enterprise-textMuted/20 rounded-sm ml-0.5 mb-0.5" />
              </div>
            </div>
          )}
          {variant === 1 && (
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                <div className="w-2 h-2 bg-enterprise-blue rounded-sm" />
                <div className="w-2 h-2 bg-enterprise-textMuted/20 rounded-sm" />
              </div>
              <div className="w-[1px] h-6 bg-enterprise-border" />
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-enterprise-blue rounded-sm" />
                <div className="text-[8px] text-enterprise-blue font-bold mt-0.5">?</div>
              </div>
            </div>
          )}
          {variant === 2 && (
            <div className="flex items-center space-x-1 font-bold text-enterprise-blue">
               <div className="flex space-x-0.5">
                <div className="w-2 h-2 bg-enterprise-blue rounded-sm" />
                <div className="w-2 h-2 bg-enterprise-textMuted/20 rounded-sm" />
              </div>
              <span>:</span>
              <div className="w-2 h-2 bg-enterprise-blue rounded-sm" />
              <span>=?</span>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center space-y-1 scale-125">
        {variant === 0 && (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-enterprise-textMuted/20 rounded-sm" />
              <div className="w-2 h-2 bg-enterprise-textMuted/20 rounded-sm" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-enterprise-purple font-bold text-xs">×</span>
              <div className="w-2 h-3 bg-enterprise-purple rounded-sm" />
            </div>
            <div className="w-10 h-[1px] bg-enterprise-border my-1" />
            <div className="text-[10px] text-enterprise-purple font-bold">?</div>
          </div>
        )}
        {variant === 1 && (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 mb-1">
              <div className="w-6 h-2 bg-enterprise-textMuted/20 rounded-sm" />
              <span className="text-enterprise-purple font-bold text-xs">×</span>
              <div className="w-2 h-2 bg-enterprise-purple rounded-sm" />
              <div className="w-2 h-2 bg-enterprise-textMuted/20 rounded-sm" />
            </div>
            <div className="text-[10px] text-enterprise-purple font-bold">?</div>
          </div>
        )}
        {variant === 2 && (
          <div className="flex flex-col items-center">
             <div className="flex items-center space-x-1 mb-1">
              <div className="w-6 h-2 bg-enterprise-textMuted/20 rounded-sm" />
              <span className="text-enterprise-purple font-bold text-xs">×</span>
              <div className="w-4 h-2 bg-enterprise-purple rounded-sm" />
            </div>
            <div className="text-[10px] text-enterprise-purple font-bold">?</div>
          </div>
        )}
      </div>
    );
  };

  const renderMain = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

      {/* Free Access Banner */}
      <div className="px-4">
        <div className="bg-gradient-to-tr from-enterprise-success/10 to-enterprise-blue/10 p-6 rounded-2xl border border-enterprise-success/20 shadow-enterprise">
          <div className="flex items-center space-x-4 mb-3">
            <div className="w-12 h-12 bg-enterprise-success/10 rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-enterprise-success" />
            </div>
            <div>
              <span className="text-[13px] font-extrabold text-enterprise-success uppercase tracking-widest block">100% Free</span>
              <span className="text-[15px] font-bold text-enterprise-text">All Features Unlocked</span>
            </div>
          </div>
          <p className="text-[14px] font-medium text-enterprise-textMuted leading-relaxed">
            No account required. Your settings and history are stored locally on your device.
          </p>
        </div>
      </div>

      {/* Math Engine Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[11px] font-bold text-enterprise-textMuted uppercase tracking-wider px-1">Math Engine</h3>
        <div className="enterprise-card overflow-hidden">
          <button
            onClick={() => setActiveTab('methods')}
            className="w-full flex items-center justify-between p-5 hover:bg-enterprise-bgAlt transition-colors border-b border-enterprise-border"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-enterprise-purple/10 rounded-xl flex items-center justify-center text-enterprise-purple">
                  <Sparkles size={20} />
               </div>
               <span className="font-semibold text-[15px] text-enterprise-text">Preferred animated methods</span>
            </div>
            <ChevronRight size={18} className="text-enterprise-textLight" />
          </button>
          <button
            onClick={() => setActiveTab('decimal')}
            className="w-full flex items-center justify-between p-5 hover:bg-enterprise-bgAlt transition-colors"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-enterprise-blue/10 rounded-xl flex items-center justify-center text-enterprise-blue">
                  <Globe size={20} />
               </div>
               <span className="font-semibold text-[15px] text-enterprise-text">Decimal sign & Locale</span>
            </div>
            <ChevronRight size={18} className="text-enterprise-textLight" />
          </button>
        </div>
      </div>

      {/* System Settings Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[11px] font-bold text-enterprise-textMuted uppercase tracking-wider px-1">System</h3>
        <div className="enterprise-card overflow-hidden">
          <button
            onClick={() => setActiveTab('appearance')}
            className="w-full flex items-center justify-between p-5 hover:bg-enterprise-bgAlt transition-colors border-b border-enterprise-border"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-enterprise-warning/10 rounded-xl flex items-center justify-center text-enterprise-warning">
                  <Sun size={20} />
               </div>
               <span className="font-semibold text-[15px] text-enterprise-text">Appearance</span>
            </div>
            <ChevronRight size={18} className="text-enterprise-textLight" />
          </button>
          <div className="w-full flex items-center justify-between p-5">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-enterprise-danger/10 rounded-xl flex items-center justify-center text-enterprise-danger">
                  <Smartphone size={20} />
               </div>
               <span className="font-semibold text-[15px] text-enterprise-text">Haptic Feedback</span>
            </div>
            <div
              onClick={() => updateSettings({ hapticFeedback: !settings.hapticFeedback })}
              className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${settings.hapticFeedback ? 'bg-enterprise-success' : 'bg-enterprise-textMuted/30'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform ${settings.hapticFeedback ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Data & Storage Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[11px] font-bold text-enterprise-textMuted uppercase tracking-wider px-1">Data & Storage</h3>
        <div className="enterprise-card p-5">
          <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 bg-enterprise-blue/10 rounded-xl flex items-center justify-center text-enterprise-blue">
                <Database size={20} />
             </div>
             <span className="font-semibold text-[15px] text-enterprise-text">Local Storage</span>
          </div>
          <p className="text-[14px] text-enterprise-textMuted font-medium leading-relaxed">
            All your data is stored locally in your browser. Nothing is sent to external servers. Clear your browser data to reset the app.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[11px] font-bold text-enterprise-textMuted uppercase tracking-wider px-1">About</h3>
        <div className="enterprise-card overflow-hidden">
          <button
            onClick={() => setActiveTab('about')}
            className="w-full flex items-center justify-between p-5 hover:bg-enterprise-bgAlt transition-colors"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-enterprise-textMuted/10 rounded-xl flex items-center justify-center text-enterprise-text">
                  <Info size={20} />
               </div>
               <span className="font-semibold text-[15px] text-enterprise-text">About Stepwise</span>
            </div>
            <ChevronRight size={18} className="text-enterprise-textLight" />
          </button>
        </div>
      </div>

      <div className="text-center py-6">
        <p className="text-[12px] font-semibold text-enterprise-textLight uppercase tracking-wider">Version 2.4.0 (Build 420)</p>
      </div>
    </div>
  );

  const renderMethods = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-400 px-4">
      <div className="space-y-6">
        <h4 className="text-[16px] font-bold text-enterprise-text">Select your preferred division method:</h4>
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => updateSettings({ divisionMethod: i })}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center p-4 transition-all relative ${
                settings.divisionMethod === i ? 'border-enterprise-blue bg-white shadow-enterprise-lg' : 'border-enterprise-border bg-white hover:border-enterprise-blue/30'
              }`}
            >
              <MethodIcon type="div" variant={i} />
              {settings.divisionMethod === i && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-full flex items-center justify-center text-white shadow-md">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-[16px] font-bold text-enterprise-text">Select your preferred multiplication method:</h4>
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => updateSettings({ multiplicationMethod: i })}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center p-4 transition-all relative ${
                settings.multiplicationMethod === i ? 'border-enterprise-purple bg-white shadow-enterprise-lg' : 'border-enterprise-border bg-white hover:border-enterprise-purple/30'
              }`}
            >
              <MethodIcon type="mul" variant={i} />
              {settings.multiplicationMethod === i && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-full flex items-center justify-center text-white shadow-md">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDecimal = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-400 px-4">
      <h4 className="text-[16px] font-bold text-enterprise-text">Select decimal sign:</h4>
      <div className="flex space-x-4">
        <button
          onClick={() => updateSettings({ decimalSign: 'comma' })}
          className={`flex-1 h-32 rounded-2xl border-2 flex items-center justify-center transition-all relative ${
            settings.decimalSign === 'comma' ? 'border-enterprise-blue bg-white shadow-enterprise-lg' : 'border-enterprise-border bg-white hover:border-enterprise-blue/30'
          }`}
        >
          <div className="text-2xl font-medium text-enterprise-text tracking-tight">
            3<span className="text-enterprise-blue font-bold">,</span>14
          </div>
          {settings.decimalSign === 'comma' && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-full flex items-center justify-center text-white shadow-md">
              <Check size={14} strokeWidth={3} />
            </div>
          )}
        </button>
        <button
          onClick={() => updateSettings({ decimalSign: 'dot' })}
          className={`flex-1 h-32 rounded-2xl border-2 flex items-center justify-center transition-all relative ${
            settings.decimalSign === 'dot' ? 'border-enterprise-blue bg-white shadow-enterprise-lg' : 'border-enterprise-border bg-white hover:border-enterprise-blue/30'
          }`}
        >
          <div className="text-2xl font-medium text-enterprise-text tracking-tight">
            3<span className="text-enterprise-blue font-bold">.</span>14
          </div>
          {settings.decimalSign === 'dot' && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-full flex items-center justify-center text-white shadow-md">
              <Check size={14} strokeWidth={3} />
            </div>
          )}
        </button>
      </div>
      <p className="text-[14px] text-enterprise-textMuted font-medium leading-relaxed">
         Note: This will also affect the input keyboard format and standard output notation.
      </p>
    </div>
  );

  const renderAppearance = () => (
     <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-400 px-4">
        <h4 className="text-[16px] font-bold text-enterprise-text">Choose Theme</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {['system', 'light', 'dark'].map((theme) => (
              <button
                key={theme}
                onClick={() => updateSettings({ theme: theme as any })}
                className={`flex flex-col items-center space-y-4 p-5 rounded-2xl border-2 transition-all ${
                   settings.theme === theme ? 'border-enterprise-blue bg-white shadow-enterprise-lg' : 'border-enterprise-border bg-white hover:border-enterprise-blue/30'
                }`}
              >
                 <div className={`w-full h-20 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-enterprise-navy' : 'bg-enterprise-bgAlt border border-enterprise-border'}`}>
                    {theme === 'light' && <Sun className="text-enterprise-warning" />}
                    {theme === 'dark' && <Moon className="text-white" />}
                    {theme === 'system' && <Smartphone className="text-enterprise-textMuted" />}
                 </div>
                 <span className="font-semibold text-enterprise-text capitalize">{theme}</span>
                 {settings.theme === theme && (
                   <div className="w-2 h-2 rounded-full bg-enterprise-blue" />
                 )}
              </button>
           ))}
        </div>
     </div>
  );

  const renderAbout = () => (
     <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-400 px-4">
        <div className="flex flex-col items-center py-8 space-y-4">
           <div className="w-20 h-20 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-2xl flex items-center justify-center shadow-enterprise-lg shadow-enterprise-blue/30">
              <span className="text-3xl font-black text-white">S</span>
           </div>
           <div className="text-center space-y-1">
              <h4 className="text-2xl font-bold text-enterprise-text tracking-tight">Stepwise</h4>
              <p className="text-enterprise-textMuted font-medium">Enterprise AI Math Platform</p>
           </div>
        </div>

        <div className="enterprise-card p-6 space-y-4">
           <h5 className="font-bold text-enterprise-text text-lg">What is Stepwise?</h5>
           <p className="text-[14px] text-enterprise-textMuted font-medium leading-relaxed">
             Stepwise is a free, enterprise-grade math learning tool that helps you understand mathematical concepts step-by-step. Powered by AI, it breaks down complex problems into clear, digestible explanations.
           </p>
           <div className="pt-4 border-t border-enterprise-border space-y-3">
             <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-enterprise-success/10 rounded-lg flex items-center justify-center">
                 <Zap size={16} className="text-enterprise-success" />
               </div>
               <span className="text-[14px] font-medium text-enterprise-text">AI-powered step-by-step solutions</span>
             </div>
             <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-enterprise-purple/10 rounded-lg flex items-center justify-center">
                 <Sparkles size={16} className="text-enterprise-purple" />
               </div>
               <span className="text-[14px] font-medium text-enterprise-text">Scientific calculator with graphing</span>
             </div>
             <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-enterprise-danger/10 rounded-lg flex items-center justify-center">
                 <Heart size={16} className="text-enterprise-danger" />
               </div>
               <span className="text-[14px] font-medium text-enterprise-text">Spaced repetition flashcards</span>
             </div>
           </div>
        </div>

        <div className="text-center space-y-2 pb-8">
           <p className="text-[12px] font-semibold text-enterprise-textLight uppercase tracking-wider">
             100% Free • No Account Required • Privacy First
           </p>
           <p className="text-[11px] text-enterprise-textLight/60 flex items-center justify-center space-x-1">
             <span>Made with</span>
             <Heart size={10} className="text-enterprise-danger fill-enterprise-danger" />
             <span>for learners everywhere</span>
           </p>
        </div>
     </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-enterprise-bg overflow-hidden">
      {/* Enterprise Top Navigation Bar */}
      <div className="enterprise-nav flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          {activeTab !== 'main' ? (
            <button
              onClick={() => setActiveTab('main')}
              className="p-2.5 text-enterprise-blue hover:bg-enterprise-blue/10 rounded-xl transition-all flex items-center space-x-1 group"
            >
              <ChevronLeft size={22} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
              <span className="font-semibold text-[15px] hidden sm:inline">Back</span>
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 text-enterprise-blue hover:bg-enterprise-blue/10 rounded-xl transition-all flex items-center space-x-1 group"
            >
              <ChevronLeft size={22} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
              <span className="font-semibold text-[15px] hidden sm:inline">Back</span>
            </button>
          )}

          <div className="h-6 w-px bg-enterprise-border mx-2 hidden md:block" />

          <button onClick={onMenuClick} className="p-2.5 text-enterprise-textMuted hover:bg-enterprise-bgAlt rounded-xl md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>

          <div className="hidden md:flex items-center space-x-2 ml-2">
            <div className="w-8 h-8 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center">
              <Settings size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-enterprise-text text-[15px]">
              {activeTab === 'main' ? 'Settings' :
               activeTab === 'methods' ? 'Methods' :
               activeTab === 'decimal' ? 'Decimal Sign' :
               activeTab === 'appearance' ? 'Appearance' : 'About'}
            </span>
          </div>
        </div>

        {activeTab === 'main' && (
          <button
            onClick={() => navigate(-1)}
            className="text-enterprise-blue font-semibold text-[15px] hover:bg-enterprise-blue/10 px-4 py-2 rounded-xl transition-colors"
          >
            Close
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-xl mx-auto">
          {activeTab === 'main' && renderMain()}
          {activeTab === 'methods' && renderMethods()}
          {activeTab === 'decimal' && renderDecimal()}
          {activeTab === 'appearance' && renderAppearance()}
          {activeTab === 'about' && renderAbout()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
