import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, ChevronDown, HelpCircle, Sparkles, Camera, Calculator, BrainCircuit, Shield } from 'lucide-react';

interface FAQProps {
  onMenuClick: () => void;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
    >
      <span className="font-bold text-apple-darkGray dark:text-white pr-4">{question}</span>
      <ChevronDown
        size={20}
        className={`text-apple-gray flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && (
      <div className="px-5 pb-5 text-apple-gray dark:text-[#A1A1A6] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
        {answer}
      </div>
    )}
  </div>
);

const FAQ: React.FC<FAQProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    {
      title: "General",
      icon: <HelpCircle size={20} className="text-apple-blue" />,
      faqs: [
        {
          question: "Is Stepwise really free?",
          answer: "Yes, Stepwise is 100% free with no hidden costs, premium tiers, or subscriptions. All features including AI-powered solving, the scientific calculator, and flashcards are available to everyone at no charge."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account is required. You can start using Stepwise immediately. Your data is stored locally in your browser, so there's no sign-up process, email verification, or login needed."
        },
        {
          question: "How is my data stored?",
          answer: "All your data (settings, history, flashcards) is stored locally in your browser using localStorage. Nothing is sent to our servers. To clear your data, simply clear your browser's site data for Stepwise."
        },
        {
          question: "Does Stepwise work offline?",
          answer: "The calculator and flashcard features work offline once the page is loaded. However, the AI solver requires an internet connection to process your math problems through our AI service."
        }
      ]
    },
    {
      title: "AI Solver",
      icon: <Sparkles size={20} className="text-purple-500" />,
      faqs: [
        {
          question: "How accurate are the AI solutions?",
          answer: "Our AI is powered by advanced language models and provides accurate solutions for most math problems. However, like any AI system, it may occasionally make errors. We recommend verifying important calculations, especially for exams or critical applications."
        },
        {
          question: "What types of math problems can it solve?",
          answer: "Stepwise handles a wide range of math topics including arithmetic, algebra, geometry, trigonometry, calculus (derivatives, integrals), statistics, and more. It works with both equations and word problems."
        },
        {
          question: "Why are solutions explained step-by-step?",
          answer: "We believe understanding the 'why' is more valuable than just the answer. Each step includes an explanation to help you learn the concept, not just copy the solution. There's also a 'Simplify' button for even clearer explanations."
        },
        {
          question: "Can I see my solving history?",
          answer: "Yes! Click the history icon in the solver to see your recent problems. Up to 20 recent problems are stored locally in your browser for quick reference."
        }
      ]
    },
    {
      title: "Photo Scanning",
      icon: <Camera size={20} className="text-apple-blue" />,
      faqs: [
        {
          question: "How do I scan a math problem?",
          answer: "On the home screen, point your camera at any math problem (handwritten or printed) and tap the capture button. You can also upload an image from your gallery by tapping the image icon."
        },
        {
          question: "Why isn't my handwritten problem being recognized?",
          answer: "For best results: ensure good lighting, write clearly with dark ink on light paper, hold the camera steady, and frame the problem clearly in the viewfinder. Avoid shadows and glare."
        },
        {
          question: "Are my photos stored?",
          answer: "No. Photos are processed temporarily to extract the math problem and are immediately discarded. They are not stored on our servers or in your browser."
        }
      ]
    },
    {
      title: "Calculator",
      icon: <Calculator size={20} className="text-apple-success" />,
      faqs: [
        {
          question: "What operations does the calculator support?",
          answer: "The scientific calculator supports basic arithmetic, exponents, roots, trigonometric functions, logarithms, constants (pi, e), and more. You can also use variables (like 'x') to create expressions for graphing."
        },
        {
          question: "How do I graph a function?",
          answer: "Enter any expression with 'x' as the variable (e.g., 'x^2' or 'sin(x)') and it will automatically appear in the graph panel. You can also directly edit the function in the graph input field."
        },
        {
          question: "Can I see my calculation history?",
          answer: "Press the '=' button after a calculation to add it to your session history. Your recent calculations are displayed below the input area."
        }
      ]
    },
    {
      title: "Flashcards & Learning",
      icon: <BrainCircuit size={20} className="text-apple-warning" />,
      faqs: [
        {
          question: "How does the spaced repetition system work?",
          answer: "We use the SM-2 algorithm, a proven scientific method for memory retention. Cards you struggle with appear more frequently, while mastered cards are shown less often. This optimizes your study time."
        },
        {
          question: "Can I add my own flashcards?",
          answer: "Currently, Stepwise comes with pre-built flashcards covering essential math concepts. Custom card creation is planned for a future update."
        },
        {
          question: "What does the streak counter track?",
          answer: "The streak counts consecutive days you've completed a flashcard session. It's a motivational tool to encourage daily practice, which research shows is more effective than cramming."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: <Shield size={20} className="text-apple-danger" />,
      faqs: [
        {
          question: "Is my data private?",
          answer: "Absolutely. We don't collect personal information, create user profiles, or use tracking cookies. Your data stays on your device. The only external communication is with the AI service when you solve problems."
        },
        {
          question: "How do I delete my data?",
          answer: "Go to your browser settings and clear site data for Stepwise. This removes all locally stored settings, history, and flashcard progress. There's nothing on our servers to delete."
        }
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
          FAQ
        </h2>

        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-apple-darkGray dark:text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-apple-gray dark:text-[#A1A1A6]">
              Find answers to common questions about Stepwise
            </p>
          </div>

          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-8 h-8 bg-black/[0.03] dark:bg-white/10 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <h2 className="text-lg font-bold text-apple-darkGray dark:text-white">{category.title}</h2>
              </div>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categories
                    .slice(0, categoryIndex)
                    .reduce((acc, cat) => acc + cat.faqs.length, 0) + faqIndex;
                  return (
                    <FAQItem
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === globalIndex}
                      onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="text-center pt-8 pb-4">
            <p className="text-apple-gray dark:text-[#A1A1A6]">
              Still have questions?{' '}
              <button
                onClick={() => navigate('/contact')}
                className="text-apple-blue hover:underline font-medium"
              >
                Contact us
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
