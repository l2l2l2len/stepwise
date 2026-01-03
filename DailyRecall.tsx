import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Lightbulb,
  Star,
  Quote,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { RecallCard } from './types';
import { calculateSM2 } from './spacedRepetition';
import MixedContent from './MixedContent';
import MathRenderer from './MathRenderer';

const INITIAL_CARDS: Partial<RecallCard>[] = [
  { id: '1', type: 'formula', category: 'Geometry', front: 'The Quadratic Formula', back: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
  { id: '2', type: 'trap', category: 'Algebra', front: 'Distributing a Negative', back: 'Crucial: $-(x - 5)$ becomes $-x + 5$. Forgetting to flip the inner sign is the #1 algebraic error.' },
  { id: '3', type: 'concept', category: 'Calculus', front: 'Definition of a Derivative', back: 'The derivative represents the **instantaneous slope** of a function at any given point.' },
  { id: '4', type: 'mnemonic', category: 'Arithmetic', front: 'Order of Operations', back: 'PEMDAS / BODMAS: Parentheses, Exponents, Multiplication & Division (Left to Right), Addition & Subtraction.' }
];

const DAILY_TIPS = [
  "Explain the problem to an imaginary student to solidy your understanding.",
  "Always check your units! Many math errors are just unit conversion slips.",
  "Visualize abstract functions as physical movements or gradients.",
  "Calculus is 10% concepts and 90% persistent algebraic simplification.",
  "Consistency beats intensity. 5 minutes of math a day is better than a 2-hour cram."
];

const DailyRecall: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<RecallCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [streak, setStreak] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    setDailyTip(DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)]);

    const saved = localStorage.getItem('stepwise_recall_cards');
    if (saved) {
      setCards(JSON.parse(saved));
    } else {
      const init = INITIAL_CARDS.map(c => ({
        ...c,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: Date.now(),
        mastered: false
      } as RecallCard));
      setCards(init);
      localStorage.setItem('stepwise_recall_cards', JSON.stringify(init));
    }

    const savedStreak = localStorage.getItem('stepwise_streak');
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const handleRating = (quality: number) => {
    const card = cards[currentIndex];
    const { interval, repetitions, easeFactor } = calculateSM2(quality, card.repetitions, card.easeFactor, card.interval);

    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...card,
      interval,
      repetitions,
      easeFactor,
      nextReviewDate: Date.now() + interval * 24 * 60 * 60 * 1000
    };

    setCards(updatedCards);
    localStorage.setItem('stepwise_recall_cards', JSON.stringify(updatedCards));

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionCompleted(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('stepwise_streak', newStreak.toString());
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="flex-1 flex flex-col h-full bg-enterprise-bg overflow-hidden">
      {/* Enterprise Top Navigation Bar */}
      <div className="enterprise-nav flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-enterprise-blue hover:bg-enterprise-blue/10 rounded-xl transition-all flex items-center space-x-1 group"
          >
            <ChevronLeft size={22} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
            <span className="font-semibold text-[15px] hidden sm:inline">Back</span>
          </button>

          <div className="h-6 w-px bg-enterprise-border mx-2 hidden md:block" />

          <button onClick={onMenuClick} className="p-2.5 text-enterprise-textMuted hover:bg-enterprise-bgAlt rounded-xl md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>

          <div className="hidden md:flex items-center space-x-2 ml-2">
            <div className="w-8 h-8 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center">
              <Brain size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-enterprise-text text-[15px]">Daily Recall</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-enterprise-warning/10 px-4 py-2 rounded-xl border border-enterprise-warning/20">
          <Zap size={16} className="text-enterprise-warning fill-enterprise-warning" />
          <span className="font-bold text-enterprise-warning text-sm">{streak} Day Streak</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-10">
        {sessionCompleted ? (
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500 pt-16">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-3xl flex items-center justify-center shadow-enterprise-lg shadow-enterprise-blue/30 transform rotate-3">
                <Trophy size={56} className="text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="enterprise-heading-lg text-enterprise-text">Session Complete</h2>
              <p className="text-enterprise-textMuted text-lg leading-relaxed max-w-md">
                Your mathematical intuition is sharpening. Keep this momentum going!
              </p>
            </div>

            <div className="w-full enterprise-card p-8 flex flex-col items-center space-y-4">
              <Sparkles className="text-enterprise-blue" size={28} strokeWidth={2} />
              <p className="text-lg italic text-enterprise-text font-medium leading-relaxed">"{dailyTip}"</p>
            </div>

            <button
              onClick={() => { setSessionCompleted(false); setCurrentIndex(0); }}
              className="w-full enterprise-btn-gradient py-5 text-lg"
            >
              Practice Again
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8 pb-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-enterprise-text">Practice Session</h2>
              <p className="text-enterprise-textMuted text-sm uppercase tracking-wider">Card {currentIndex + 1} of {cards.length}</p>
            </div>

            {/* Flashcard */}
            <div
              className="relative w-full max-w-xl h-[300px] sm:h-[350px] md:h-[380px] cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`w-full h-full transition-all duration-700 preserve-3d rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
                {/* Front Side */}
                <div className="absolute inset-0 enterprise-card p-10 flex flex-col items-center justify-center text-center backface-hidden shadow-enterprise-lg">
                  <div className="absolute top-8 left-8 text-[11px] font-semibold text-enterprise-blue uppercase tracking-wider bg-enterprise-blue/10 px-4 py-1.5 rounded-full">
                    {currentCard?.type}
                  </div>
                  <div className="text-xs font-medium text-enterprise-textMuted mb-6 uppercase tracking-widest">{currentCard?.category}</div>
                  <div className="text-2xl font-bold text-enterprise-text leading-tight px-4">
                    <MathRenderer math={currentCard?.front || ""} block />
                  </div>
                  <div className="mt-12 flex items-center space-x-2 text-enterprise-textLight text-[11px] font-medium uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-all">
                    <Sparkles size={14} strokeWidth={2.5} />
                    <span>Tap to reveal</span>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 enterprise-card border-2 border-enterprise-blue/20 p-10 flex flex-col items-center justify-center text-center backface-hidden overflow-y-auto"
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-8 left-8 text-[11px] font-semibold text-enterprise-blue uppercase tracking-wider bg-enterprise-blue/10 px-4 py-1.5 rounded-full">
                    Answer
                  </div>
                  <div className="text-xl font-medium leading-relaxed text-enterprise-text w-full">
                    <MixedContent content={currentCard?.back || ""} />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Buttons */}
            <div className={`flex items-center space-x-4 transition-all duration-500 w-full max-w-xl ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <button
                onClick={(e) => { e.stopPropagation(); handleRating(1); }}
                className="flex-1 py-5 enterprise-card hover:bg-enterprise-danger/5 text-enterprise-danger border-enterprise-danger/20 flex items-center justify-center space-x-3 transition-all font-semibold active:scale-95"
              >
                <XCircle size={22} strokeWidth={2} />
                <span>Need Review</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleRating(5); }}
                className="flex-[1.5] py-5 enterprise-btn-gradient flex items-center justify-center space-x-3 active:scale-95"
              >
                <CheckCircle2 size={24} strokeWidth={2} />
                <span>I Know This</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyRecall;
