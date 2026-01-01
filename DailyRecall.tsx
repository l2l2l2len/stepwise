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
import { RecallCard } from '../types';
import { calculateSM2 } from '../utils/spacedRepetition';
import MixedContent from '../components/MixedContent';
import MathRenderer from '../components/MathRenderer';

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
    <div className="flex-1 flex flex-col h-full bg-apple-bg overflow-hidden">
      {/* Universal Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-2xl border-b border-black/[0.05] sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-apple-blue hover:bg-apple-blue/5 rounded-full transition-all flex items-center space-x-1 group"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
            <span className="font-bold text-[17px] hidden sm:inline">Back</span>
          </button>

          <div className="h-6 w-px bg-black/[0.08] mx-2 hidden md:block" />

          <button onClick={onMenuClick} className="p-2.5 text-apple-darkGray hover:bg-black/5 rounded-full md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>

          <div className="hidden md:flex items-center space-x-2 ml-2">
            <Brain size={18} className="text-apple-warning" strokeWidth={2.5} />
            <span className="font-bold text-apple-darkGray tracking-tight text-[17px]">Daily Practice</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-apple-warning/10 px-4 py-2 rounded-full border border-apple-warning/10">
          <Zap size={16} className="text-apple-warning fill-apple-warning" />
          <span className="font-extrabold text-apple-warning text-sm tracking-tighter">{streak} Day Streak</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-10">
        {sessionCompleted ? (
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500 pt-20">
            <div className="relative">
              <div className="w-32 h-32 bg-apple-warning rounded-3xl flex items-center justify-center shadow-2xl shadow-apple-warning/30 transform rotate-3 animate-pulse">
                <Trophy size={64} className="text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-apple-darkGray tracking-tighter">Session Complete</h2>
              <p className="text-apple-gray text-lg leading-relaxed font-bold">
                Your mathematical intuition is sharpening. Keep this momentum for tomorrow.
              </p>
            </div>

            <div className="w-full bg-white p-8 rounded-3xl border border-black/5 shadow-apple-soft flex flex-col items-center space-y-4">
              <Sparkles className="text-apple-warning" size={32} strokeWidth={2.5} />
              <p className="text-lg italic text-apple-darkGray font-extrabold leading-snug">"{dailyTip}"</p>
            </div>

            <button
              onClick={() => { setSessionCompleted(false); setCurrentIndex(0); }}
              className="w-full py-5 bg-apple-darkGray text-white font-bold rounded-2xl hover:bg-black transition-all shadow-apple-soft active:scale-95 text-lg"
            >
              Reset for Review
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-10 pb-6">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-extrabold text-apple-darkGray tracking-tighter">Practice Ritual</h2>
              <p className="text-apple-gray font-bold text-[13px] uppercase tracking-[0.3em]">Module {currentIndex + 1} of {cards.length}</p>
            </div>

            <div
              className="relative w-full max-w-xl h-[300px] sm:h-[350px] md:h-[400px] cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`w-full h-full transition-all duration-700 preserve-3d shadow-2xl rounded-[32px] ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
                {/* Front Side */}
                <div className="absolute inset-0 bg-white border border-black/5 rounded-[32px] p-12 flex flex-col items-center justify-center text-center backface-hidden">
                  <div className="absolute top-10 left-10 text-[11px] font-bold text-apple-blue uppercase tracking-[0.25em] bg-apple-blue/5 px-4 py-1.5 rounded-full border border-apple-blue/10">
                    {currentCard?.type}
                  </div>
                  <div className="text-xs font-bold text-apple-gray mb-6 uppercase tracking-[0.4em] opacity-40">{currentCard?.category}</div>
                  <div className="text-3xl font-extrabold text-apple-darkGray leading-tight px-4">
                    <MathRenderer math={currentCard?.front || ""} block />
                  </div>
                  <div className="mt-16 flex items-center space-x-3 text-apple-gray text-[11px] font-bold uppercase tracking-[0.25em] opacity-30 group-hover:opacity-100 transition-all">
                    <Sparkles size={16} strokeWidth={2.5} />
                    <span>Flip Card</span>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 bg-apple-bg border-2 border-apple-warning/20 rounded-[32px] p-12 flex flex-col items-center justify-center text-center backface-hidden overflow-y-auto"
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-10 left-10 text-[11px] font-bold text-apple-warning uppercase tracking-[0.25em] bg-apple-warning/5 px-4 py-1.5 rounded-full border border-apple-warning/10">
                    Correct Insight
                  </div>
                  <div className="text-2xl font-bold leading-relaxed text-apple-danger w-full">
                    <MixedContent content={currentCard?.back || ""} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex items-center space-x-6 transition-all duration-500 w-full max-w-xl ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
              <button
                onClick={(e) => { e.stopPropagation(); handleRating(1); }}
                className="flex-1 py-5 bg-white hover:bg-apple-danger/5 text-apple-danger border border-black/[0.08] rounded-2xl flex items-center justify-center space-x-3 transition-all font-bold shadow-apple-soft group active:scale-95"
              >
                <XCircle size={22} strokeWidth={2.5} />
                <span>Need Review</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleRating(5); }}
                className="flex-[1.5] py-5 bg-apple-warning text-white rounded-2xl flex items-center justify-center space-x-3 transition-all font-bold shadow-xl shadow-apple-warning/20 group active:scale-95"
              >
                <CheckCircle2 size={24} strokeWidth={2.5} />
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