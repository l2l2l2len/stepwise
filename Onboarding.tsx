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
      title: "AI-Powered Solutions",
      description: "Get step-by-step explanations powered by advanced AI that breaks down complex problems.",
      icon: <Sparkles className="text-enterprise-blue" size={24} />
    },
    {
      title: "Deep Understanding",
      description: "Learn the 'how' and 'why' behind every solution with clear, intuitive explanations.",
      icon: <Brain className="text-enterprise-purple" size={24} />
    },
    {
      title: "Unlimited Access",
      description: "No limits, no subscriptions. Full access to all features, completely free.",
      icon: <Zap className="text-enterprise-warning" size={24} />
    }
  ];

  const handleFinish = () => {
    onComplete();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-enterprise-navy z-[1000] flex flex-col items-center justify-between p-6 sm:p-8 md:p-12 overflow-y-auto">
      {/* Gradient Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-enterprise-blue/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-enterprise-purple/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full flex justify-between items-center max-w-lg relative z-10">
        <button onClick={handleFinish} className="p-2 -ml-2 text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-xl flex items-center justify-center">
            <span className="font-bold text-white text-lg">S</span>
          </div>
          <span className="font-bold text-xl text-white">Stepwise</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Hero Visual */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg space-y-10 py-8 relative z-10">

        {/* Hero Text */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Mathematical<br />
            <span className="enterprise-text-gradient">Intelligence</span>
          </h1>
          <p className="text-white/60 text-lg max-w-sm mx-auto leading-relaxed">
            Enterprise-grade AI for solving any math problem with clarity
          </p>
        </div>

        {/* Mockup Card */}
        <div className="relative w-full max-w-xs transform hover:scale-[1.02] transition-transform duration-500">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-5 overflow-hidden">
            <div className="h-3 w-20 bg-white/10 rounded-full mb-5" />
            <div className="space-y-3">
              <div className="h-10 bg-gradient-to-r from-enterprise-blue/20 to-enterprise-purple/20 rounded-xl flex items-center px-4">
                <div className="h-2 w-1/2 bg-white/20 rounded-full" />
              </div>
              <div className="h-28 border border-dashed border-white/10 rounded-xl flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-enterprise-blue/50 flex items-center justify-center">
                  <Sparkles size={24} className="text-enterprise-blue" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-2 w-full bg-white/5 rounded-full" />
                <div className="h-2 w-2/3 bg-white/5 rounded-full" />
              </div>
            </div>
          </div>
          {/* Glow Effects */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-enterprise-blue/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-enterprise-purple/20 rounded-full blur-2xl" />
        </div>

        {/* Features List */}
        <div className="w-full space-y-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center">
                {f.icon}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-semibold text-white text-[16px]">{f.title}</h3>
                <p className="text-[14px] text-white/50 leading-snug">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-lg space-y-5 pt-4 relative z-10">
        <button
          onClick={handleFinish}
          className="w-full h-14 sm:h-16 enterprise-btn-gradient text-lg flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ChevronRight size={20} />
        </button>

        <div className="flex items-center justify-center space-x-2 text-enterprise-blueLight">
          <ShieldCheck size={16} strokeWidth={2.5} />
          <span className="text-[12px] font-semibold uppercase tracking-wider">Free Forever • No Account Required</span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
