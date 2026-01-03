import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, all } from 'mathjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Calculator as CalcIcon,
  RotateCcw,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { evaluateExpression, generateGraphData } from './mathHelpers';

const math = create(all);

const CalculatorPage: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [graphFn, setGraphFn] = useState<string>('x^2');
  const [history, setHistory] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setResult(null);
      setError(null);
      return;
    }

    const timeout = setTimeout(() => {
      const res = evaluateExpression(input);
      if (res.success) {
        setResult(res.formatted);
        setError(null);
        if (input.includes('x')) {
          setGraphFn(input);
        }
      } else {
        setError(res.error);
        setResult(null);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  const graphData = useMemo(() => {
    return generateGraphData(graphFn, -10, 10);
  }, [graphFn]);

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', 'x'],
  ];

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
              <CalcIcon size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-enterprise-text text-[15px]">Calculator</span>
          </div>
        </div>
        <button
          onClick={() => setInput('')}
          className="p-2.5 text-enterprise-textMuted hover:text-enterprise-text hover:bg-enterprise-bgAlt rounded-xl transition-all"
        >
          <RotateCcw size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Keypad & Input */}
        <div className="w-full md:w-1/2 lg:w-[480px] flex flex-col bg-white border-r border-enterprise-border p-6 space-y-6 overflow-y-auto">

          {/* Display Card */}
          <div className="enterprise-card p-6 min-h-[160px] flex flex-col justify-between border-enterprise-blue/10">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter expression..."
              className="bg-transparent border-none outline-none w-full text-xl font-semibold resize-none placeholder-enterprise-textLight text-enterprise-text leading-relaxed"
              rows={2}
            />
            <div className="flex justify-between items-end pt-4">
              <div className="text-[12px] text-enterprise-danger font-medium uppercase tracking-wide">{error && 'Syntax Error'}</div>
              <div className="text-4xl font-bold text-enterprise-blue tracking-tight font-mono overflow-x-auto">{result || '0'}</div>
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.flat().map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'C') setInput('');
                  else if (btn === '=') {
                    if (result) setHistory(prev => [input + ' = ' + result, ...prev.slice(0, 4)]);
                  } else setInput(prev => prev + btn);
                }}
                className={`py-5 rounded-xl font-semibold text-lg transition-all active:scale-95 ${btn === '='
                  ? 'bg-gradient-to-br from-enterprise-blue to-enterprise-purple text-white shadow-lg shadow-enterprise-blue/20'
                  : ['/', '*', '-', '+', 'C'].includes(btn)
                    ? 'bg-enterprise-blue/10 text-enterprise-blue hover:bg-enterprise-blue/20'
                    : 'bg-enterprise-bgAlt border border-enterprise-border text-enterprise-text hover:bg-enterprise-border/50'
                  }`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Calculation Breakdown */}
          <div className="enterprise-card p-5 border-enterprise-border">
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="w-full flex items-center justify-between text-sm font-semibold text-enterprise-text"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-enterprise-blue/10 flex items-center justify-center">
                  <Info size={16} className="text-enterprise-blue" strokeWidth={2.5} />
                </div>
                <span>Calculation Details</span>
              </div>
              {showSteps ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
            </button>
            {showSteps && (
              <div className="mt-4 text-[13px] text-enterprise-textMuted leading-relaxed font-mono p-4 bg-enterprise-bgAlt rounded-xl border border-enterprise-border">
                {input ? (
                  <div className="space-y-2">
                    <p className="flex justify-between"><span className="opacity-50 uppercase tracking-wider text-[10px]">Input</span> <span className="text-enterprise-text">{input}</span></p>
                    <p className="flex justify-between"><span className="opacity-50 uppercase tracking-wider text-[10px]">Engine</span> <span className="text-enterprise-text">Math.JS v15</span></p>
                    <p className="flex justify-between"><span className="opacity-50 uppercase tracking-wider text-[10px]">Precision</span> <span className="text-enterprise-text">14 Digits</span></p>
                    <div className="h-px bg-enterprise-border my-2" />
                    <p className="flex justify-between text-enterprise-blue font-semibold"><span>Result</span> <span>{result}</span></p>
                  </div>
                ) : "Enter an expression to see details."}
              </div>
            )}
          </div>
        </div>

        {/* Right: Graphing */}
        <div className="flex-1 flex flex-col p-6 md:p-10 space-y-8 overflow-y-auto">
          <div className="enterprise-card p-8 flex-1 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <div className="text-[11px] font-semibold text-enterprise-blue uppercase tracking-wider flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-enterprise-blue" />
                  <span>Function Plot</span>
                </div>
                <h3 className="text-xl font-bold text-enterprise-text">Graph Visualization</h3>
              </div>

              <div className="flex items-center space-x-3 bg-enterprise-bgAlt border border-enterprise-border px-4 py-2 rounded-xl">
                <span className="text-[12px] font-semibold text-enterprise-textMuted uppercase tracking-wider">f(x) = </span>
                <input
                  value={graphFn}
                  onChange={(e) => setGraphFn(e.target.value)}
                  className="bg-transparent border-none outline-none text-[14px] font-semibold text-enterprise-text w-32"
                />
              </div>
            </div>

            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="x" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}
                    itemStyle={{ color: '#3B82F6', fontWeight: '600', fontSize: '13px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={1000}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
