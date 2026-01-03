import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, Camera, Sparkles, Calculator, BrainCircuit, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onMenuClick: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'scanner',
      icon: <Camera size={32} className="text-apple-blue" />,
      title: "Photo Scanner",
      subtitle: "Snap & Solve",
      color: "apple-blue",
      steps: [
        "Point your camera at any math problem",
        "Frame the problem clearly in the viewfinder",
        "Tap the capture button to analyze",
        "Get instant step-by-step solutions"
      ],
      tips: [
        "Works with handwritten and printed problems",
        "Good lighting improves accuracy",
        "You can also upload images from your gallery"
      ]
    },
    {
      id: 'solver',
      icon: <Sparkles size={32} className="text-purple-500" />,
      title: "AI Solver",
      subtitle: "Type & Understand",
      color: "purple-500",
      steps: [
        "Type or paste any math problem",
        "Click 'Compute' to get the solution",
        "Explore each step with detailed explanations",
        "Use 'Simplify' for beginner-friendly explanations"
      ],
      tips: [
        "Supports algebra, calculus, statistics, and more",
        "Try the example problems to get started",
        "View intuition and common mistakes to deepen understanding"
      ]
    },
    {
      id: 'calculator',
      icon: <Calculator size={32} className="text-apple-success" />,
      title: "Scientific Calculator",
      subtitle: "Calculate & Graph",
      color: "apple-success",
      steps: [
        "Enter any mathematical expression",
        "See real-time results as you type",
        "Use 'x' to create functions for graphing",
        "Explore the interactive function plot"
      ],
      tips: [
        "Supports trig functions, logarithms, and constants",
        "View calculation breakdown for transparency",
        "Works offline once the page is loaded"
      ]
    },
    {
      id: 'flashcards',
      icon: <BrainCircuit size={32} className="text-apple-warning" />,
      title: "Daily Recall",
      subtitle: "Learn & Remember",
      color: "apple-warning",
      steps: [
        "Start your daily practice session",
        "Tap a card to reveal the answer",
        "Rate your recall: 'Need Review' or 'I Know This'",
        "Build your streak for consistent learning"
      ],
      tips: [
        "Uses spaced repetition (SM-2 algorithm) for optimal retention",
        "Cards you struggle with appear more frequently",
        "5 minutes daily beats 2-hour cramming sessions"
      ]
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
          How It Works
        </h2>

        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-apple-darkGray dark:text-white tracking-tight">
              Master Math with Stepwise
            </h1>
            <p className="text-xl text-apple-gray dark:text-[#A1A1A6] max-w-2xl mx-auto">
              Four powerful tools working together to help you understand, practice, and remember mathematics.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-sm"
              >
                <div className="p-8 md:p-10 space-y-6">
                  {/* Feature Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-apple-darkGray dark:text-white">{feature.title}</h2>
                        <p className="text-apple-gray dark:text-[#A1A1A6] font-medium">{feature.subtitle}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex text-[11px] font-bold text-apple-gray uppercase tracking-[0.2em] bg-black/[0.03] dark:bg-white/10 px-4 py-2 rounded-full">
                      Step {index + 1} of 4
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Steps */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-apple-gray dark:text-[#A1A1A6] uppercase tracking-wider">How to use</h3>
                      <div className="space-y-3">
                        {feature.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-3">
                            <div className={`w-6 h-6 bg-${feature.color}/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <span className={`text-xs font-bold text-${feature.color}`}>{stepIndex + 1}</span>
                            </div>
                            <p className="text-apple-darkGray dark:text-white">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-apple-gray dark:text-[#A1A1A6] uppercase tracking-wider">Pro Tips</h3>
                      <div className="space-y-3">
                        {feature.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start space-x-3">
                            <CheckCircle2 size={18} className="text-apple-success flex-shrink-0 mt-0.5" />
                            <p className="text-apple-gray dark:text-[#A1A1A6]">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Try It Button */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/10">
                    <Link
                      to={feature.id === 'scanner' ? '/' : feature.id === 'flashcards' ? '/recall' : `/${feature.id}`}
                      className={`inline-flex items-center space-x-2 px-6 py-3 bg-${feature.color}/10 text-${feature.color} rounded-xl font-bold hover:bg-${feature.color}/20 transition-colors`}
                    >
                      <span>Try {feature.title}</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Getting Started CTA */}
          <div className="text-center space-y-6 pb-8">
            <h2 className="text-2xl font-bold text-apple-darkGray dark:text-white">Ready to Get Started?</h2>
            <p className="text-apple-gray dark:text-[#A1A1A6] max-w-lg mx-auto">
              No account needed. Just open the app and start learning. Your progress is automatically saved in your browser.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-apple-blue text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-apple-blue/20"
            >
              <span>Launch Stepwise</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
