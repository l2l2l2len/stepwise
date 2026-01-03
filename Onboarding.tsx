import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Sparkles, Brain, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const features = [
    {
      title: "Animated Tutorials",
      description: "Animations bring solutions to life by visualizing each step of the mathematical process.",
      icon: <Sparkles className="text-apple-blue" size={24} />
    },
    {
      title: "In-depth Explanations",
      description: "Study smart and strengthen understanding with \"how\" and \"why\" tips for every problem.",
      icon: <Brain className="text-purple-500" size={24} />
    },
    {
      title: "Unlimited Solving",
      description: "No daily limits. Solve as many problems as you need with our most advanced AI engine.",
      icon: <Zap className="text-apple-warning" size={24} />
    }
  ];

  const handleFinish = () => {
    onComplete();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#121212] z-[1000] flex flex-col items-center justify-between p-6 sm:p-8 md:p-12 overflow-y-auto">
      {/* Header */}
      <div className="w-full flex justify-between items-center max-w-lg">
        <button onClick={handleFinish} className="p-2 -ml-2 text-apple-gray hover:text-apple-darkGray dark:hover:text-white transition-colors">
          <X size={28} />
        </button>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl sm:text-2xl tracking-tighter text-apple-darkGray dark:text-white">Stepwise</span>
          <span className="bg-gradient-to-r from-apple-blue to-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-widest uppercase">Unlimited</span>
        </div>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Hero Visual */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg space-y-8 sm:space-y-12 py-6 sm:py-10">
        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-apple-blue/5 to-transparent rounded-[40px] -z-10 blur-3xl" />

          {/* Mockup Animation Representation */}
          <div className="relative w-full max-w-xs transform -rotate-6 hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-apple-deep border border-black/[0.05] dark:border-white/10 p-4 overflow-hidden">
              <div className="h-4 w-24 bg-black/[0.05] dark:bg-white/10 rounded-full mb-6" />
              <div className="space-y-4">
                <div className="h-12 bg-apple-blue/10 rounded-xl flex items-center px-4">
                  <div className="h-2 w-1/2 bg-apple-blue/40 rounded-full" />
                </div>
                <div className="h-32 border border-dashed border-black/[0.1] dark:border-white/20 rounded-xl flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-apple-blue flex items-center justify-center animate-pulse">
                      <div className="w-8 h-1 bg-apple-blue rotate-45" />
                      <div className="w-8 h-1 bg-apple-blue -rotate-45 absolute" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-black/[0.03] dark:bg-white/10 rounded-full" />
                  <div className="h-2 w-3/4 bg-black/[0.03] dark:bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
            {/* Floating elements to mimic user screenshot */}
            <div className="absolute -top-10 -right-6 w-20 h-20 bg-apple-warning/20 rounded-2xl blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-8 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Features List */}
        <div className="w-full space-y-6 sm:space-y-8 px-2">
          {features.map((f, i) => (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
              className="group"
            >
              <div
                style={{ flexShrink: 0, width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="bg-black/[0.03] dark:bg-white/10 group-hover:bg-black/[0.05] dark:group-hover:bg-white/15 rounded-xl transition-colors"
              >
                {f.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }} className="space-y-1">
                <h3 className="font-bold text-[17px] sm:text-[19px] text-apple-darkGray dark:text-white tracking-tight">{f.title}</h3>
                <p className="text-[14px] sm:text-[15px] font-medium text-apple-gray dark:text-[#A1A1A6] leading-snug">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-lg space-y-4 sm:space-y-6 pt-4 sm:pt-6 pb-2">
        <button
          onClick={handleFinish}
          className="w-full h-14 sm:h-16 bg-apple-darkGray dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-[#121212] rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-black/10 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>Get Started Free</span>
          <ChevronRight size={20} />
        </button>

        <div className="flex items-center justify-center space-x-2 text-apple-success">
          <ShieldCheck size={16} strokeWidth={3} />
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider">Lifetime Access Unlocked</span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;