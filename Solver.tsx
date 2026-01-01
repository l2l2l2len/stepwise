
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  History, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  BrainCircuit, 
  ChevronLeft, 
  Menu, 
  Copy, 
  Check, 
  Share2,
  Lightbulb
} from 'lucide-react';
import { solveMathProblem } from './gemini';
import { SolverResult } from './types';
import MathRenderer from './MathRenderer';

interface SolverProps {
  onMenuClick: () => void;
}

const Solver: React.FC<SolverProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SolverResult | null>(null);
  const [history, setHistory] = useState<SolverResult[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [simplifiedSteps, setSimplifiedSteps] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('stepwise_solver_history');
    if (saved) setHistory(JSON.parse(saved));

    if (location.state && location.state.scanResult) {
      setResult(location.state.scanResult);
      setInput(location.state.scanResult.problem);
      setExpandedStep(0);
      setSimplifiedSteps({});
    }
  }, [location.state]);

  const handleSolve = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSimplifiedSteps({});
    try {
      const data = await solveMathProblem(input);
      setResult(data);
      const newHistory = [data, ...history.filter(h => h.problem !== data.problem).slice(0, 19)];
      setHistory(newHistory);
      localStorage.setItem('stepwise_solver_history', JSON.stringify(newHistory));
      setExpandedStep(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAnswer = () => {
    if (result) {
      navigator.clipboard.writeText(result.finalAnswer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleSimplify = (idx: number) => {
    setSimplifiedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const examples = [
    "Solve 2x^2 + 5x - 3 = 0",
    "Integrate sin(x) from 0 to pi",
    "Find the limit of (1+1/n)^n as n goes to infinity",
    "What is the standard deviation of {2, 4, 4, 4, 5, 5, 7, 9}?"
  ];

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
          
          <button onClick={onMenuClick} className="p-2.5 text-apple-darkGray hover:bg-black/5 rounded-full transition-colors md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>
          
          <div className="hidden md:flex items-center space-x-2 ml-2">
            <Sparkles size={18} className="text-purple-500" strokeWidth={2.5} />
            <span className="font-bold text-apple-darkGray tracking-tight text-[17px]">AI Solver</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-3">
          <button className="p-2.5 text-apple-gray hover:text-apple-darkGray hover:bg-black/5 rounded-xl transition-all">
            <History size={20} strokeWidth={2.5} />
          </button>
          <button className="p-2.5 text-apple-gray hover:text-apple-darkGray hover:bg-black/5 rounded-xl transition-all">
            <Share2 size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-12 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Main Interface Content */}
          <div className="text-center space-y-10">
            {!result && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-purple-500/20 mb-6">
                  <Sparkles className="text-white" size={32} strokeWidth={2.5} />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-apple-darkGray">
                  Math, made <span className="text-purple-500 underline decoration-purple-500/20 underline-offset-8">clear.</span>
                </h1>
                <p className="text-apple-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-semibold">
                  Get instant step-by-step clarity for any mathematical challenge.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSolve} className="relative group max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <div className="absolute left-6 text-apple-gray group-focus-within:text-purple-500 transition-colors">
                  <Search size={22} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask any math question..."
                  className="w-full bg-white border border-black/[0.08] focus:border-purple-500/30 focus:ring-[8px] focus:ring-purple-500/5 rounded-3xl pl-16 pr-40 py-6 text-xl outline-none transition-all duration-300 shadow-apple-soft placeholder:text-apple-gray/40 font-bold"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-3 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-2xl transition-all duration-300 flex items-center space-x-2 font-bold shadow-lg shadow-purple-600/20 active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Compute</span>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="flex items-center justify-center space-x-3 text-apple-danger bg-apple-danger/5 p-5 rounded-2xl border border-apple-danger/10 max-w-3xl mx-auto">
                <AlertCircle size={20} strokeWidth={2.5} />
                <span className="font-bold">{error}</span>
              </div>
            )}
          </div>

          {/* Results Reveal Section */}
          {result && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="apple-card p-12 md:p-16 relative overflow-hidden group border-purple-500/10">
                <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Sparkles size={160} className="text-purple-500" strokeWidth={1} />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-purple-600 uppercase tracking-[0.2em] flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <span>AI Solved Result</span>
                    </div>
                    <h2 className="text-[13px] font-bold text-apple-gray uppercase tracking-widest">Final Computation</h2>
                  </div>
                  
                  <button 
                    onClick={copyAnswer}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-black/[0.04] hover:bg-black/[0.08] rounded-full text-[13px] font-bold transition-all active:scale-95"
                  >
                    {copied ? <Check size={16} strokeWidth={2.5} className="text-apple-success" /> : <Copy size={16} strokeWidth={2.5} />}
                    <span>{copied ? 'Copied' : 'Copy LaTeX'}</span>
                  </button>
                </div>

                <div className="py-10 border-y border-black/[0.03]">
                  <MathRenderer math={result.finalAnswer} block className="text-4xl md:text-5xl font-bold tracking-tighter text-apple-darkGray" />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-apple-darkGray tracking-tight px-2">Solution Pipeline</h3>
                <div className="space-y-4">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="apple-card overflow-hidden transition-all duration-500">
                      <button 
                        onClick={() => {
                          setExpandedStep(expandedStep === idx ? null : idx);
                        }}
                        className={`w-full flex items-center justify-between p-8 text-left transition-colors ${expandedStep === idx ? 'bg-black/[0.02]' : 'hover:bg-black/[0.01]'}`}
                      >
                        <div className="flex items-center space-x-8">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-[17px] transition-all ${expandedStep === idx ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-black/[0.04] text-apple-gray'}`}>
                            {idx + 1}
                          </div>
                          <div className="font-bold text-apple-darkGray text-xl">
                            <MathRenderer math={step.operation} />
                          </div>
                        </div>
                        <div className={`transition-transform duration-500 ${expandedStep === idx ? 'rotate-180 text-purple-600' : 'text-apple-gray'}`}>
                          <ChevronDown size={24} strokeWidth={2.5} />
                        </div>
                      </button>
                      
                      {expandedStep === idx && (
                        <div className="px-12 md:px-28 pb-10 pt-2 space-y-6 bg-black/[0.01] animate-in slide-in-from-top-2 duration-300">
                          <div className="space-y-4">
                            <p className={`text-lg leading-relaxed font-bold transition-all duration-500 ${simplifiedSteps[idx] ? 'text-apple-blue' : 'text-apple-darkGray/80'}`}>
                              {simplifiedSteps[idx] ? step.simplifiedExplanation : step.explanation}
                            </p>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSimplify(idx);
                              }}
                              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 border-2 ${
                                simplifiedSteps[idx] 
                                  ? 'bg-apple-blue text-white border-apple-blue shadow-lg shadow-apple-blue/20' 
                                  : 'bg-white text-apple-blue border-apple-blue/20 hover:border-apple-blue/40'
                              }`}
                            >
                              <Lightbulb size={16} strokeWidth={2.5} className={simplifiedSteps[idx] ? 'animate-pulse' : ''} />
                              <span>{simplifiedSteps[idx] ? 'Back to Standard' : 'Simplify Further'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="apple-card p-10 bg-purple-500/[0.02] border-purple-500/10 space-y-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-apple-soft">
                    <BrainCircuit size={28} strokeWidth={2.5} className="text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl text-apple-darkGray">Intuition</h4>
                    <p className="text-apple-gray text-base leading-relaxed font-bold">{result.intuition}</p>
                  </div>
                </div>
                
                <div className="apple-card p-10 bg-apple-warning/[0.02] border-apple-warning/10 space-y-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-apple-soft">
                    <AlertCircle size={28} strokeWidth={2.5} className="text-apple-warning" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl text-apple-darkGray">Avoid Mistakes</h4>
                    <ul className="space-y-4">
                      {result.commonMistakes.map((mistake, i) => (
                        <li key={i} className="text-apple-gray text-base flex items-start space-x-4">
                          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-apple-warning flex-shrink-0" />
                          <span className="font-bold leading-relaxed">{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              {examples.map((ex, i) => (
                <button 
                  key={i}
                  onClick={() => { setInput(ex); handleSolve(); }}
                  className="p-8 text-left bg-white hover:bg-black/[0.01] border border-black/[0.05] rounded-3xl transition-all hover:-translate-y-1 active:scale-95 shadow-apple-soft group"
                >
                  <div className="text-[11px] font-bold text-purple-600 mb-4 uppercase tracking-[0.2em] flex items-center space-x-2">
                    <Sparkles size={12} strokeWidth={3} />
                    <span>Tutorial Case {i + 1}</span>
                  </div>
                  <div className="text-lg font-bold text-apple-darkGray leading-snug">{ex}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Solver;
