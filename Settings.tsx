import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Added Sparkles to the imports below to fix the "Cannot find name 'Sparkles'" error
import { ChevronLeft, ChevronRight, Menu, X, Check, Globe, Moon, Sun, Smartphone, Bell, Info, Mail, Star, ExternalLink, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { AppSettings } from '../App';

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
              <div className="text-[10px] text-apple-danger font-bold">?</div>
              <div className="flex items-end">
                <div className="w-1.5 h-3 bg-apple-danger/20 rounded-sm mr-0.5" />
                <div className="w-4 h-2 bg-apple-danger rounded-sm mb-0.5" />
                <div className="w-4 h-2 bg-apple-gray/20 rounded-sm ml-0.5 mb-0.5" />
              </div>
            </div>
          )}
          {variant === 1 && (
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                <div className="w-2 h-2 bg-apple-danger rounded-sm" />
                <div className="w-2 h-2 bg-apple-gray/20 rounded-sm" />
              </div>
              <div className="w-[1px] h-6 bg-black/20" />
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-apple-danger rounded-sm" />
                <div className="text-[8px] text-apple-danger font-bold mt-0.5">?</div>
              </div>
            </div>
          )}
          {variant === 2 && (
            <div className="flex items-center space-x-1 font-bold text-apple-danger">
               <div className="flex space-x-0.5">
                <div className="w-2 h-2 bg-apple-danger rounded-sm" />
                <div className="w-2 h-2 bg-apple-gray/20 rounded-sm" />
              </div>
              <span>:</span>
              <div className="w-2 h-2 bg-apple-danger rounded-sm" />
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
              <div className="w-2 h-2 bg-apple-gray/20 rounded-sm" />
              <div className="w-2 h-2 bg-apple-gray/20 rounded-sm" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-apple-danger font-bold text-xs">×</span>
              <div className="w-2 h-3 bg-apple-danger rounded-sm" />
            </div>
            <div className="w-10 h-[1px] bg-black/20 my-1" />
            <div className="text-[10px] text-apple-danger font-bold">?</div>
          </div>
        )}
        {variant === 1 && (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 mb-1">
              <div className="w-6 h-2 bg-apple-gray/20 rounded-sm" />
              <span className="text-apple-danger font-bold text-xs">×</span>
              <div className="w-2 h-2 bg-apple-danger rounded-sm" />
              <div className="w-2 h-2 bg-apple-gray/20 rounded-sm" />
            </div>
            <div className="text-[10px] text-apple-danger font-bold">?</div>
          </div>
        )}
        {variant === 2 && (
          <div className="flex flex-col items-center">
             <div className="flex items-center space-x-1 mb-1">
              <div className="w-6 h-2 bg-apple-gray/20 rounded-sm" />
              <span className="text-apple-danger font-bold text-xs">×</span>
              <div className="w-4 h-2 bg-apple-danger rounded-sm" />
            </div>
            <div className="text-[10px] text-apple-danger font-bold">?</div>
          </div>
        )}
      </div>
    );
  };

  const renderMain = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Account Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[13px] font-bold text-apple-gray uppercase tracking-[0.05em] px-1">Account</h3>
        <div className="bg-white rounded-[24px] border border-black/[0.05] overflow-hidden apple-shadow">
          <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-apple-lightGray/30 transition-colors">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-apple-blue rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
                <span className="text-xl font-bold">JS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-apple-darkGray">John Smith</span>
                <span className="text-sm font-medium text-apple-success flex items-center space-x-1">
                   <ShieldCheck size={14} />
                   <span>Unlimited Member</span>
                </span>
              </div>
            </div>
            <ChevronRight size={22} className="text-apple-gray/30 group-hover:text-apple-gray transition-colors" />
          </div>
        </div>
      </div>

      {/* Math Engine Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[13px] font-bold text-apple-gray uppercase tracking-[0.05em] px-1">Math Engine</h3>
        <div className="bg-white rounded-[24px] border border-black/[0.05] overflow-hidden apple-shadow">
          <button 
            onClick={() => setActiveTab('methods')}
            className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors border-b border-black/[0.03]"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                  <Sparkles size={20} />
               </div>
               <span className="font-bold text-[17px] text-apple-darkGray">Preferred animated methods</span>
            </div>
            <ChevronRight size={20} className="text-apple-gray/30" />
          </button>
          <button 
            onClick={() => setActiveTab('decimal')}
            className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-apple-blue/10 rounded-xl flex items-center justify-center text-apple-blue">
                  <Globe size={20} />
               </div>
               <span className="font-bold text-[17px] text-apple-darkGray">Decimal sign & Locale</span>
            </div>
            <ChevronRight size={20} className="text-apple-gray/30" />
          </button>
        </div>
      </div>

      {/* System Settings Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[13px] font-bold text-apple-gray uppercase tracking-[0.05em] px-1">System</h3>
        <div className="bg-white rounded-[24px] border border-black/[0.05] overflow-hidden apple-shadow">
          <button 
            onClick={() => setActiveTab('appearance')}
            className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors border-b border-black/[0.03]"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600">
                  <Sun size={20} />
               </div>
               <span className="font-bold text-[17px] text-apple-darkGray">Appearance</span>
            </div>
            <ChevronRight size={20} className="text-apple-gray/30" />
          </button>
          <div className="w-full flex items-center justify-between p-6 border-b border-black/[0.03]">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-apple-danger/10 rounded-xl flex items-center justify-center text-apple-danger">
                  <Smartphone size={20} />
               </div>
               <span className="font-bold text-[17px] text-apple-darkGray">Haptic Feedback</span>
            </div>
            <div 
              onClick={() => updateSettings({ hapticFeedback: !settings.hapticFeedback })}
              className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${settings.hapticFeedback ? 'bg-apple-success' : 'bg-apple-gray/30'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform ${settings.hapticFeedback ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
          <button className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-apple-success/10 rounded-xl flex items-center justify-center text-apple-success">
                  <Bell size={20} />
               </div>
               <span className="font-bold text-[17px] text-apple-darkGray">Notifications</span>
            </div>
            <ChevronRight size={20} className="text-apple-gray/30" />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-3 px-4">
        <h3 className="text-[13px] font-bold text-apple-gray uppercase tracking-[0.05em] px-1">Support & About</h3>
        <div className="bg-white rounded-[24px] border border-black/[0.05] overflow-hidden apple-shadow">
          <button className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors border-b border-black/[0.03]">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-apple-blue/10 rounded-xl flex items-center justify-center text-apple-blue">
                  <HelpCircle size={20} />
               </div>
               <span className="font-bold text-apple-darkGray">Help Center</span>
            </div>
            <ChevronRight size={20} className="text-apple-gray/30" />
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors border-b border-black/[0.03]"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-apple-darkGray">
                  <Info size={20} />
               </div>
               <span className="font-bold text-apple-darkGray">About Stepwise</span>
            </div>
            <ChevronRight size={20} className="text-apple-gray/30" />
          </button>
        </div>
      </div>

      <div className="text-center py-6">
        <p className="text-[13px] font-bold text-apple-gray/50 uppercase tracking-widest">Version 2.4.0 (Build 420)</p>
      </div>
    </div>
  );

  const renderMethods = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-400">
      <div className="space-y-6">
        <h4 className="text-[18px] font-bold text-apple-darkGray px-2">Select your preferred division method:</h4>
        <div className="grid grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => updateSettings({ divisionMethod: i })}
              className={`aspect-square rounded-[24px] border-2 flex items-center justify-center p-6 transition-all relative ${
                settings.divisionMethod === i ? 'border-apple-danger bg-white shadow-lg' : 'border-black/[0.05] bg-white hover:border-black/10'
              }`}
            >
              <MethodIcon type="div" variant={i} />
              {settings.divisionMethod === i && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-apple-danger rounded-full flex items-center justify-center text-white shadow-md">
                  <Check size={16} strokeWidth={4} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-[18px] font-bold text-apple-darkGray px-2">Select your preferred multiplication method:</h4>
        <div className="grid grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => updateSettings({ multiplicationMethod: i })}
              className={`aspect-square rounded-[24px] border-2 flex items-center justify-center p-6 transition-all relative ${
                settings.multiplicationMethod === i ? 'border-apple-danger bg-white shadow-lg' : 'border-black/[0.05] bg-white hover:border-black/10'
              }`}
            >
              <MethodIcon type="mul" variant={i} />
              {settings.multiplicationMethod === i && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-apple-danger rounded-full flex items-center justify-center text-white shadow-md">
                  <Check size={16} strokeWidth={4} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDecimal = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-400">
      <h4 className="text-[18px] font-bold text-apple-darkGray px-2">Select decimal sign:</h4>
      <div className="flex space-x-6 px-2">
        <button
          onClick={() => updateSettings({ decimalSign: 'comma' })}
          className={`w-36 h-36 rounded-[24px] border-2 flex items-center justify-center transition-all relative ${
            settings.decimalSign === 'comma' ? 'border-apple-blue bg-white shadow-lg' : 'border-black/[0.05] bg-white hover:border-black/10'
          }`}
        >
          <div className="text-3xl font-medium text-apple-darkGray tracking-tight">
            3<span className="text-apple-danger font-bold">,</span>14
          </div>
          {settings.decimalSign === 'comma' && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-apple-blue rounded-full flex items-center justify-center text-white shadow-md">
              <Check size={16} strokeWidth={4} />
            </div>
          )}
        </button>
        <button
          onClick={() => updateSettings({ decimalSign: 'dot' })}
          className={`w-36 h-36 rounded-[24px] border-2 flex items-center justify-center transition-all relative ${
            settings.decimalSign === 'dot' ? 'border-apple-blue bg-white shadow-lg' : 'border-black/[0.05] bg-white hover:border-black/10'
          }`}
        >
          <div className="text-3xl font-medium text-apple-darkGray tracking-tight">
            3<span className="text-apple-danger font-bold">.</span>14
          </div>
          {settings.decimalSign === 'dot' && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-apple-blue rounded-full flex items-center justify-center text-white shadow-md">
              <Check size={16} strokeWidth={4} />
            </div>
          )}
        </button>
      </div>
      <p className="text-[15px] text-apple-gray font-medium leading-relaxed px-2">
         Note: This will also affect the input keyboard format and standard output notation.
      </p>
    </div>
  );

  const renderAppearance = () => (
     <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-400">
        <h4 className="text-[18px] font-bold text-apple-darkGray px-2">Choose Theme</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
           {['system', 'light', 'dark'].map((theme) => (
              <button 
                key={theme}
                onClick={() => updateSettings({ theme: theme as any })}
                className={`flex flex-col items-center space-y-4 p-6 rounded-3xl border-2 transition-all ${
                   settings.theme === theme ? 'border-apple-blue bg-white shadow-lg' : 'border-black/[0.05] bg-white'
                }`}
              >
                 <div className={`w-full h-24 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-[#1D1D1F]' : 'bg-[#F2F2F7] border border-black/5'}`}>
                    {theme === 'light' && <Sun className="text-apple-blue" />}
                    {theme === 'dark' && <Moon className="text-white" />}
                    {theme === 'system' && <Smartphone className="text-apple-gray" />}
                 </div>
                 <span className="font-bold capitalize">{theme}</span>
              </button>
           ))}
        </div>
     </div>
  );

  const renderAbout = () => (
     <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-400">
        <div className="flex flex-col items-center py-10 space-y-4">
           <div className="w-24 h-24 bg-apple-blue rounded-[32px] flex items-center justify-center shadow-xl shadow-apple-blue/20">
              <span className="text-4xl font-black text-white">S</span>
           </div>
           <div className="text-center space-y-1">
              <h4 className="text-2xl font-bold tracking-tighter">Stepwise Unlimited</h4>
              <p className="text-apple-gray font-medium">Empowering clarity through precision.</p>
           </div>
        </div>

        <div className="bg-white rounded-[24px] border border-black/[0.05] overflow-hidden apple-shadow">
           <button className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors border-b border-black/[0.03]">
              <div className="flex items-center space-x-4">
                 <Globe size={20} className="text-apple-blue" />
                 <span className="font-bold text-apple-darkGray">Visit Website</span>
              </div>
              <ExternalLink size={18} className="text-apple-gray/30" />
           </button>
           <button className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors border-b border-black/[0.03]">
              <div className="flex items-center space-x-4">
                 <Mail size={20} className="text-purple-600" />
                 <span className="font-bold text-apple-darkGray">Contact Support</span>
              </div>
              <ChevronRight size={18} className="text-apple-gray/30" />
           </button>
           <button className="w-full flex items-center justify-between p-6 hover:bg-apple-lightGray/50 transition-colors">
              <div className="flex items-center space-x-4">
                 <Star size={20} className="text-apple-warning" />
                 <span className="font-bold text-apple-darkGray">Rate Stepwise</span>
              </div>
              <ChevronRight size={18} className="text-apple-gray/30" />
           </button>
        </div>
     </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F2F2F7] overflow-hidden">
      {/* Settings Header */}
      <div className="flex items-center justify-between px-6 bg-white border-b border-black/[0.05] sticky top-0 z-[100] h-[100px] pt-12 md:pt-4">
        <div className="w-28">
          {activeTab !== 'main' && (
            <button 
              onClick={() => setActiveTab('main')} 
              className="p-2 -ml-2 text-apple-danger hover:bg-apple-danger/5 rounded-full transition-all flex items-center space-x-1 group"
            >
              <ChevronLeft size={28} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
              <span className="font-bold text-[18px]">Settings</span>
            </button>
          )}
        </div>
        
        <h2 className="font-extrabold text-[18px] text-apple-darkGray tracking-tight text-center flex-1 truncate">
          {activeTab === 'main' ? 'Settings' : 
           activeTab === 'methods' ? 'Methods' : 
           activeTab === 'decimal' ? 'Decimal Sign' : 
           activeTab === 'appearance' ? 'Appearance' : 'About'}
        </h2>

        <div className="w-28 flex justify-end">
          {activeTab === 'main' && (
            <button 
              onClick={() => navigate(-1)}
              className="text-apple-danger font-bold text-[18px] hover:bg-apple-danger/5 px-4 py-2 rounded-full transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-8 pb-20">
        <div className="max-w-xl mx-auto md:px-6">
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