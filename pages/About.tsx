import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, Sparkles, Calculator, BrainCircuit, Camera, Zap, Heart, Shield, Globe } from 'lucide-react';

interface AboutProps {
  onMenuClick: () => void;
}

const About: React.FC<AboutProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Camera className="text-apple-blue" size={24} />,
      title: "Photo Problem Solving",
      description: "Point your camera at any math problem - handwritten or printed - and get instant step-by-step solutions."
    },
    {
      icon: <Sparkles className="text-purple-500" size={24} />,
      title: "AI-Powered Explanations",
      description: "Powered by advanced AI that breaks down complex problems into clear, understandable steps with intuitive explanations."
    },
    {
      icon: <Calculator className="text-apple-success" size={24} />,
      title: "Scientific Calculator",
      description: "Full-featured scientific calculator with graphing capabilities. Visualize functions and see results in real-time."
    },
    {
      icon: <BrainCircuit className="text-apple-warning" size={24} />,
      title: "Spaced Repetition",
      description: "Master math concepts with our smart flashcard system that uses proven memory science to optimize your learning."
    }
  ];

  const values = [
    {
      icon: <Zap className="text-apple-success" size={20} />,
      title: "100% Free",
      description: "No subscriptions, no premium tiers. Every feature is free for everyone."
    },
    {
      icon: <Shield className="text-apple-blue" size={20} />,
      title: "Privacy First",
      description: "Your data stays on your device. We don't track, store, or sell your information."
    },
    {
      icon: <Globe className="text-purple-500" size={20} />,
      title: "No Account Required",
      description: "Start learning immediately. No sign-up, no email, no barriers."
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F2F2F7] dark:bg-[#121212] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-[#1E1E1E]/70 backdrop-blur-2xl border-b border-black/[0.05] dark:border-white/10 sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-apple-blue hover:bg-apple-blue/5 rounded-full transition-all flex items-center space-x-1 group"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
            <span className="font-bold text-[17px] hidden sm:inline">Back</span>
          </button>

          <div className="h-6 w-px bg-black/[0.08] mx-2 hidden md:block" />

          <button onClick={onMenuClick} className="p-2.5 text-apple-darkGray dark:text-white hover:bg-black/5 rounded-full transition-colors md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>

        <h2 className="font-extrabold text-[18px] text-apple-darkGray dark:text-white tracking-tight">
          About Stepwise
        </h2>

        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-apple-blue rounded-[32px] flex items-center justify-center mx-auto shadow-xl shadow-apple-blue/20">
              <span className="text-4xl font-black text-white">S</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter text-apple-darkGray dark:text-white">
                Math, made clear.
              </h1>
              <p className="text-xl text-apple-gray dark:text-[#A1A1A6] leading-relaxed max-w-xl mx-auto">
                Stepwise is a free, open math learning tool that helps you understand mathematical concepts step-by-step.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 border border-black/5 dark:border-white/10 shadow-sm">
            <h2 className="text-2xl font-bold text-apple-darkGray dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-apple-gray dark:text-[#A1A1A6] leading-relaxed">
              We believe everyone deserves access to quality math education. Stepwise was built to democratize learning by providing
              powerful AI-driven explanations that adapt to your level of understanding. Whether you're struggling with basic algebra
              or tackling advanced calculus, Stepwise breaks down every problem into digestible, intuitive steps.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-apple-darkGray dark:text-white text-center">What Stepwise Offers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-sm">
                  <div className="w-12 h-12 bg-black/[0.03] dark:bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-apple-darkGray dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-apple-gray dark:text-[#A1A1A6] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-apple-darkGray dark:text-white text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {values.map((value, i) => (
                <div key={i} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-sm text-center">
                  <div className="w-10 h-10 bg-black/[0.03] dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-apple-darkGray dark:text-white mb-1">{value.title}</h3>
                  <p className="text-sm text-apple-gray dark:text-[#A1A1A6]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 pb-8">
            <div className="flex items-center justify-center space-x-1 text-apple-gray dark:text-[#A1A1A6] text-sm">
              <span>Made with</span>
              <Heart size={14} className="text-apple-danger fill-apple-danger" />
              <span>for learners everywhere</span>
            </div>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-apple-blue text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-apple-blue/20"
            >
              <span>Start Learning Free</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
