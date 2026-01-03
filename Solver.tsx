
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
  Lightbulb,
  X,
  Clock,
  Zap
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
  const [showHistory, setShowHistory] = useState(false);

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

  const loadFromHistory = (item: SolverResult) => {
    setResult(item);
    setInput(item.problem);
    setExpandedStep(0);
    setSimplifiedSteps({});
    setShowHistory(false);
  };

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
              <Sparkles size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-enterprise-text text-[15px]">AI Solver</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2.5 rounded-xl transition-all ${showHistory ? 'text-enterprise-blue bg-enterprise-blue/10' : 'text-enterprise-textMuted hover:bg-enterprise-bgAlt'}`}
          >
            <History size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="absolute top-[72px] right-4 w-80 max-h-96 bg-white rounded-2xl border border-enterprise-border shadow-enterprise-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-enterprise-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-enterprise-textMuted" />
              <span className="font-semibold text-enterprise-text">Recent Problems</span>
            </div>
            <button onClick={() => setShowHistory(false)} className="p-1.5 text-enterprise-textMuted hover:text-enterprise-text rounded-lg hover:bg-enterprise-bgAlt">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {history.length === 0 ? (
              <div className="p-6 text-center text-enterprise-textMuted text-sm">
                No history yet. Solve a problem to see it here.
              </div>
            ) : (
              history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => loadFromHistory(item)}
                  className="w-full p-4 text-left hover:bg-enterprise-bgAlt border-b border-enterprise-border/50 last:border-b-0 transition-colors"
                >
                  <p className="font-semibold text-enterprise-text text-sm truncate">{item.problem}</p>
                  <p className="text-xs text-enterprise-textMuted mt-1 truncate">Answer: {item.finalAnswer}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-12 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Hero Section */}
          <div className="text-center space-y-10">
            {!result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="w-20 h-20 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-2xl mx-auto flex items-center justify-center shadow-enterprise-lg shadow-enterprise-blue/20 mb-8">
                  <Sparkles className="text-white" size={36} strokeWidth={2.5} />
                </div>
                <h1 className="enterprise-heading-xl text-enterprise-text">
                  Mathematical <span className="enterprise-text-gradient">Intelligence</span>
                </h1>
                <p className="text-enterprise-textMuted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Advanced AI-powered problem solving with step-by-step explanations
                </p>
              </div>
            )}

            {/* Search Input */}
            <form onSubmit={handleSolve} className="relative group max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <div className="absolute left-5 text-enterprise-textMuted group-focus-within:text-enterprise-blue transition-colors">
                  <Search size={22} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter any math problem..."
                  className="enterprise-input pl-14 pr-36 py-5 text-lg rounded-2xl shadow-enterprise"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 enterprise-btn-gradient px-6 py-3 text-[15px] disabled:opacity-50 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>Solve</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="flex items-center justify-center space-x-3 text-enterprise-danger bg-enterprise-danger/10 p-5 rounded-2xl border border-enterprise-danger/20 max-w-3xl mx-auto">
                <AlertCircle size={20} strokeWidth={2.5} />
                <span className="font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {/* Answer Card */}
              <div className="enterprise-card p-10 md:p-14 relative overflow-hidden border-enterprise-blue/20">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Sparkles size={160} className="text-enterprise-blue" strokeWidth={1} />
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-enterprise-blue uppercase tracking-widest flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-enterprise-blue animate-pulse" />
                      <span>AI Computed Result</span>
                    </div>
                    <h2 className="text-sm font-semibold text-enterprise-textMuted uppercase tracking-wider">Final Answer</h2>
                  </div>

                  <button
                    onClick={copyAnswer}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-enterprise-bgAlt hover:bg-enterprise-border rounded-xl text-sm font-medium transition-all active:scale-95"
                  >
                    {copied ? <Check size={16} strokeWidth={2.5} className="text-enterprise-success" /> : <Copy size={16} strokeWidth={2.5} />}
                    <span>{copied ? 'Copied' : 'Copy LaTeX'}</span>
                  </button>
                </div>

                <div className="py-8 border-y border-enterprise-border">
                  <MathRenderer math={result.finalAnswer} block className="text-3xl md:text-4xl font-bold text-enterprise-text" />
                </div>
              </div>

              {/* Solution Steps */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-enterprise-text px-2">Solution Steps</h3>
                <div className="space-y-3">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="enterprise-card overflow-hidden">
                      <button
                        onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                        className={`w-full flex items-center justify-between p-6 text-left transition-colors ${expandedStep === idx ? 'bg-enterprise-bgAlt' : 'hover:bg-enterprise-bg'}`}
                      >
                        <div className="flex items-center space-x-5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${expandedStep === idx ? 'bg-gradient-to-br from-enterprise-blue to-enterprise-purple text-white' : 'bg-enterprise-bgAlt text-enterprise-textMuted'}`}>
                            {idx + 1}
                          </div>
                          <div className="font-medium text-enterprise-text">
                            <MathRenderer math={step.operation} />
                          </div>
                        </div>
                        <div className={`transition-transform duration-300 ${expandedStep === idx ? 'rotate-180 text-enterprise-blue' : 'text-enterprise-textMuted'}`}>
                          <ChevronDown size={20} strokeWidth={2.5} />
                        </div>
                      </button>

                      {expandedStep === idx && (
                        <div className="px-8 md:px-20 pb-8 pt-2 space-y-5 bg-enterprise-bg animate-in slide-in-from-top-2 duration-300">
                          <p className={`text-base leading-relaxed ${simplifiedSteps[idx] ? 'text-enterprise-blue' : 'text-enterprise-textMuted'}`}>
                            {simplifiedSteps[idx] ? step.simplifiedExplanation : step.explanation}
                          </p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSimplify(idx);
                            }}
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 ${
                              simplifiedSteps[idx]
                                ? 'bg-enterprise-blue text-white'
                                : 'bg-white text-enterprise-blue border border-enterprise-blue/30 hover:border-enterprise-blue'
                            }`}
                          >
                            <Lightbulb size={14} strokeWidth={2.5} />
                            <span>{simplifiedSteps[idx] ? 'Standard View' : 'Simplify'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="enterprise-card p-8 border-enterprise-blue/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-enterprise-blue/20 to-enterprise-purple/20 rounded-xl flex items-center justify-center mb-5">
                    <BrainCircuit size={24} strokeWidth={2} className="text-enterprise-blue" />
                  </div>
                  <h4 className="font-bold text-lg text-enterprise-text mb-3">Intuition</h4>
                  <p className="text-enterprise-textMuted leading-relaxed">{result.intuition}</p>
                </div>

                <div className="enterprise-card p-8 border-enterprise-warning/10">
                  <div className="w-12 h-12 bg-enterprise-warning/10 rounded-xl flex items-center justify-center mb-5">
                    <AlertCircle size={24} strokeWidth={2} className="text-enterprise-warning" />
                  </div>
                  <h4 className="font-bold text-lg text-enterprise-text mb-3">Common Mistakes</h4>
                  <ul className="space-y-3">
                    {result.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-enterprise-textMuted flex items-start space-x-3">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-enterprise-warning flex-shrink-0" />
                        <span className="leading-relaxed">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Example Cards */}
          {!result && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(ex); handleSolve(); }}
                  className="enterprise-card p-6 text-left hover:-translate-y-1 active:scale-[0.98] transition-all group"
                >
                  <div className="text-[10px] font-semibold text-enterprise-blue mb-3 uppercase tracking-wider flex items-center space-x-2">
                    <Sparkles size={10} strokeWidth={3} />
                    <span>Example {i + 1}</span>
                  </div>
                  <div className="text-base font-medium text-enterprise-text leading-snug">{ex}</div>
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
